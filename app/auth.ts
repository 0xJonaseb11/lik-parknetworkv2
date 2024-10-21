import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import { sql } from '@vercel/postgres';
import { ethers } from 'ethers';
import Avatar from 'avatar-initials';

interface CustomUser {
  id: string;
  publicAddress?: string;
}

interface JWT {
  id?: string;
  publicAddress?: string;
}

type AdminUser = {
  username: string;
  password: string;
};

async function getAdminUser(username: string): Promise<AdminUser | undefined> {
  try {
    const user =
      await sql<AdminUser>`SELECT * FROM admin_user WHERE username=${username}`;
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth
} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.OAUTH_CLIENT_KEY as string,
      clientSecret: process.env.OAUTH_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      id: 'crypto',
      name: 'Crypto Wallet Auth',
      credentials: {
        publicAddress: { label: 'Public Address', type: 'text' },
        signedNonce: { label: 'Signed Nonce', type: 'text' }
      },
      authorize: async (credentials, request) => {
        if (!credentials) return null;
        const { publicAddress, signedNonce } = credentials;

        const query = await sql`
        SELECT u.*, c.nonce, c.expires
        FROM users u
        LEFT JOIN cryptologinnonces c ON u.id = c.user_id
        WHERE u.public_address = ${publicAddress as string};
        `;

        const user: any = query.rows[0];

        if (!user?.nonce) return null;

        const signerAddress = ethers.verifyMessage(
          user.nonce,
          signedNonce as string
        );

        if (signerAddress !== publicAddress) return null;

        if (user.expires < new Date()) return null;

        await sql`
        DELETE FROM cryptologinnonces
        WHERE user_id = ${user.id};
        `;

        return {
          id: user.id.toString(),
          publicAddress: user.public_address,
          image: Avatar.gravatarUrl({
            hash: publicAddress.slice(2, 32).toLowerCase()
          })
        };
      }
    }),

    CredentialsProvider({
      id: 'admin',
      name: 'Crypto Wallet Auth',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'text' }
      },
      authorize: async (credentials, request) => {
        if (!credentials) return null;
        const { username, password } = credentials as {
          username: string;
          password: string;
        };

        const query = await sql`SELECT * FROM admin_user WHERE username=${username as string}`;

        const user: any = query.rows[0];

        if (!user) return null;

        const passwordsMatch = user.password === password;

        if (!passwordsMatch) return null;

        console.log('reached here', user.username, user);

        return {
          id: user.uesrname,
          username: user.username,
        } as any;
      }
    }),

    // CredentialsProvider({
    //   id: 'admin',
    //   name: 'Admin Auth',
    //   credentials: {
    //     username: { label: 'Username', type: 'text' },
    //     password: { label: 'Password', type: 'text' }
    //   },
    //   authorize: async (credentials, request) => {
    //     if (!credentials) return null;
    //     const { username, password } = credentials as {
    //       username: string;
    //       password: string;
    //     };

    //     const user: any = await getAdminUser(username);
    //     if (!user) return null;

    //     const passwordsMatch = await bcrypt.compare(password, user.password);

    //     if (passwordsMatch) return user;

    //     console.log('Invalid Credentials');
    //     return null;
    //   }
    // })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: 'my_jwt_token',
  pages: {
    signIn: '/sign-in'
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.publicAddress = (user as CustomUser).publicAddress;
        token.image = user.image;
      }
      return token;
    },
    session: async ({ session, token }) => {
      (session as any).user.id = token.id;
      (session as any).user.publicAddress = token.publicAddress;
      (session as any).user.image = token.image;
      return session;
    }
  }
});

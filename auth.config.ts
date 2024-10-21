// import type { NextAuthConfig } from 'next-auth';

// export const authConfig = {
//   pages: {
//     signIn: '/admin/auth/signin'
//   },
//   callbacks: {
//     authorized({ auth, request: { nextUrl } }) {
//       console.log(auth, 'what is auth and request');
//       const isLoggedIn = !!auth?.user;
//       const isOnDashboard = nextUrl.pathname.startsWith('/admin');
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false; // Redirect unauthenticated users to login page
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL('/admin', nextUrl));
//       }
//       return true;
//     }
//   },
//   providers: [] // Add providers with an empty array for now
// } satisfies NextAuthConfig;

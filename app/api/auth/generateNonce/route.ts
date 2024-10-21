import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import crypto from 'crypto';

interface CryptoNonceResponse {
  nonce: string;
  expires: string;
}

export async function GET(request: NextRequest) {}

export async function POST(
  req: NextRequest,
  res: NextResponse<CryptoNonceResponse>
) {
  const body = await req.json();
  const publicAddress: string = body.publicAddress;

  const nonce = crypto.randomBytes(32).toString('hex');
  const expires = new Date(new Date().getTime() + 1000 * 60 * 60);

  await sql`
  INSERT INTO users (
      plate,
      total_lsk,
      ev,
      exit,
      duration,
      attendant_id,
      make_model,
      payment_method,
      member_id,
      username,
      name,
      space_number,
      rate_code,
      booking_reference,
      notes,
      email,
      location,
      payment_status,
      entry,
      public_address
  ) VALUES (
      'ABC' || ROUND(RANDOM() * 10000),
      0.00,
      true,
      '2024-04-23 12:00:00',
      '1 day',
      'attendant_1',
      'Toyota Camry',
      'Credit Card',
      789,
      'user' || currval(pg_get_serial_sequence('users', 'id')),
      'User ' || currval(pg_get_serial_sequence('users', 'id')),
      'A' || ROUND(RANDOM() * 10000),
      'Hourly',
      'booking' || ROUND(RANDOM() * 10000),
      'Additional notes',
      'user_' || currval(pg_get_serial_sequence('users', 'id')) || '@example.com',
      'Parking Lot A',
      'Paid',
      '2024-04-23 11:00:00',
      ${publicAddress}
  )
  ON CONFLICT (public_address) DO NOTHING;
  `;

  await sql`
    INSERT INTO cryptologinnonces (user_id, nonce, expires)
    SELECT u.id, ${nonce}, ${expires.toISOString()}
    FROM users u
    WHERE u.public_address = ${publicAddress}
    ON CONFLICT (user_id) DO UPDATE
    SET nonce = EXCLUDED.nonce,
        expires = EXCLUDED.expires;
  `;

  return NextResponse.json(
    {
      nonce,
      expires: expires.toISOString()
    },
    { status: 200 }
  );
}

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function GET(request: NextRequest) {
  const result = await sql`SELECT * FROM users;`;
  // const result = await sql`
  //     SELECT table_name
  //     FROM information_schema.tables
  //       WHERE table_schema = 'public'
  //     AND table_type = 'BASE TABLE';
  // `;

  // const result = await sql`
  //   SELECT column_name, data_type, character_maximum_length, is_nullable, column_default
  //   FROM information_schema.columns
  //   WHERE table_name = 'parking_transactions';
  // `;

  // const result = await sql`
  //     CREATE TABLE membership_transactions (
  //         id SERIAL PRIMARY KEY,
  //         user_id INT REFERENCES users(id),
  //         membership_id INT,
  //         transaction_type VARCHAR(20),
  //         transaction_time TIMESTAMP,
  //         amount_paid NUMERIC(10, 2),
  //         blockchain_hash VARCHAR(64)
  //     );
  // `;

  // const result = await sql`
  //     CREATE TABLE parking_lot_addition_transactions (
  //         id SERIAL PRIMARY KEY,
  //         user_id INT REFERENCES users(id),
  //         parking_lot_name VARCHAR(100),
  //         parking_space_id INT,
  //         location VARCHAR(255),
  //         date_added DATE,
  //         blockchain_hash VARCHAR(64)
  //     );
  // `;

  // const result = await sql`
  //   CREATE TABLE parking_transactions (
  //     transaction_id SERIAL PRIMARY KEY,
  //     user_id INT REFERENCES users(id),
  //     vehicle_plate VARCHAR(20),
  //     parking_lot_id INT,
  //     entry_time TIMESTAMP,
  //     exit_time TIMESTAMP,
  //     amount_paid NUMERIC(10, 2),
  //     blockchain_hash VARCHAR(64)
  //   );
  // `;

  const users = result.rows;
  return NextResponse.json(users, { status: 200 });
}

export async function POST(request: NextRequest) {
  return NextResponse.json({ message: 'Hello World' }, { status: 200 });
}

import { sql } from '@vercel/postgres';
import { Card, Title, Text } from '@tremor/react';
import Search from '../search';
import UsersTable from '../../containers/transactions/UsersTable';
import ParkingTransactionTable from '../../containers/transactions/ParkingTransactionTable';
import MembershipTransactionTable from '../../containers/transactions/MembershipTransactionTable';
import ParkingLotAdditionTransactionTable from '../../containers/transactions/ParkingLotAdditionTransactionTable';
import {
  IParkingTransaction,
  IMembershipTransaction,
  IParkingLotAdditionTransactions
} from '../../types/transcation.type';

export default async function Page({
  searchParams
}: {
  searchParams: { q: string };
}) {
  const search = searchParams.q ?? '';
  const parkingResult = await sql`SELECT * FROM parking_transactions;`;
  const membershipResult = await sql`SELECT * FROM membership_transactions;`;
  const parkingSpaceResult =
    await sql`SELECT * FROM parking_lot_addition_transactions;`;
  const parkingTransactions = parkingResult.rows as Array<IParkingTransaction>;
  const membershipTransactions =
    membershipResult.rows as Array<IMembershipTransaction>;
  const parkingSpaceTransactions =
    parkingSpaceResult.rows as Array<IParkingLotAdditionTransactions>;

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <Title>Transactions</Title>
      <Text>A list of transactions recorded on the Etherium blockchain.</Text>
      <Search />
      <Card className="mt-6">
        <ParkingTransactionTable transactions={parkingTransactions} />
      </Card>
      <Card className="mt-6">
        <MembershipTransactionTable transactions={membershipTransactions} />
      </Card>
      <Card className="mt-6">
        <ParkingLotAdditionTransactionTable
          transactions={parkingSpaceTransactions}
        />
      </Card>
    </main>
  );
}

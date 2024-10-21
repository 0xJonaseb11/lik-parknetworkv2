import { FC } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { IParkingLotAdditionTransactions } from '../../types/transcation.type';

type Props = {
  transactions: Array<IParkingLotAdditionTransactions>;
};

const ParkingLotAdditionTransactionTable: FC<Props> = ({
  transactions
}: Props) => {
  return (
    <>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Parking Lot Added Transactions{' '}
      </h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>User ID</TableHeaderCell>
            <TableHeaderCell>Parking Lot Name</TableHeaderCell>
            <TableHeaderCell>Space ID</TableHeaderCell>
            <TableHeaderCell>Location </TableHeaderCell>
            <TableHeaderCell>Date Added </TableHeaderCell>
            <TableHeaderCell>Block Hash</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, transactionIdx) => (
            <TableRow key={transaction.id}>
              {Object.values(transaction)?.map((val, idx) => (
                <TableCell key={`${transactionIdx}-${idx}`}>
                  <Text>{`${val}`}</Text>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ParkingLotAdditionTransactionTable;

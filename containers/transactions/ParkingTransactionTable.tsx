import { FC } from 'react';
import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text,
  Title
} from '@tremor/react';
import { IParkingTransaction } from '../../types/transcation.type';

type Props = {
  transactions: Array<IParkingTransaction>;
};

const ParkingTransactionTable: FC<Props> = ({ transactions }: Props) => {
  return (
    <>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Parking Transactions
      </h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Transaction Id</TableHeaderCell>
            <TableHeaderCell>Entry</TableHeaderCell>
            <TableHeaderCell>Exit</TableHeaderCell>
            <TableHeaderCell>Member Id</TableHeaderCell>
            <TableHeaderCell>EV</TableHeaderCell>
            <TableHeaderCell>Total LSK</TableHeaderCell>
            <TableHeaderCell>Duration</TableHeaderCell>
            <TableHeaderCell>Rate Code</TableHeaderCell>
            <TableHeaderCell>Attendant Id</TableHeaderCell>
            <TableHeaderCell>Location</TableHeaderCell>
            <TableHeaderCell>Space Number</TableHeaderCell>
            <TableHeaderCell>Payment Status</TableHeaderCell>
            <TableHeaderCell>Payment Method</TableHeaderCell>
            <TableHeaderCell>Make Model</TableHeaderCell>
            <TableHeaderCell>Plate</TableHeaderCell>
            <TableHeaderCell>Booking Reference</TableHeaderCell>
            <TableHeaderCell>Notes</TableHeaderCell>
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

export default ParkingTransactionTable;

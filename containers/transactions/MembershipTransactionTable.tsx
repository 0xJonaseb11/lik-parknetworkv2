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
import { IMembershipTransaction } from '../../types/transcation.type';

type Props = {
  transactions: Array<IMembershipTransaction>;
};

const MembershipTransactionTable: FC<Props> = ({ transactions }: Props) => {
  return (
    <>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
        Membership Transactions
      </h3>
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>User ID</TableHeaderCell>
            <TableHeaderCell>Membership ID</TableHeaderCell>
            <TableHeaderCell>Transaction Type</TableHeaderCell>
            <TableHeaderCell>Transaction Time</TableHeaderCell>
            <TableHeaderCell>Amount Paid</TableHeaderCell>
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

export default MembershipTransactionTable;

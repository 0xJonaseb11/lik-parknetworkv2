'use client';

import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import timestring from 'timestring';
import moment from 'moment';
import StripedTable from '../../../components/Table/StripedTable';
import { IParkSpaceTransactions } from '../../../types/transcation.type';
import { getParkSpaceTransactions } from '../../../store/transactionStore';

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<Array<IParkSpaceTransactions>>([]);

  useEffect(() => {
    getParkSpaceTransactions()
      .then((res) => {
        if (res) setTransactions(res);
      });
  }, []);

  return (
    <StripedTable>
      <thead>
        <tr>
          <th scope="col">Transaction Number</th>
          <th scope="col">Member ID</th>
          <th scope="col">Space Number</th>
          <th scope="col">Entry</th>
          <th scope="col">Exit</th>
          <th scope="col">Duration</th>
        </tr>
      </thead>
      <tbody>
        {transactions?.map((transaction, transactionIdx) => (
          <tr key={transactionIdx}>
            <th scope="row">
              <a
                href={`https://sepolia-blockscout.lisk.com/tx/${transaction.transaction_id}`}
                target="_blank"
              >
                {transaction.transaction_id.slice(0, 6)}...
                {transaction.transaction_id.slice(-4)}
              </a>
            </th>
            <td>
              <a
                href={`https://sepolia-blockscout.lisk.com/address/${transaction.member_id}`}
                target="_blank"
              >
                {transaction.member_id.slice(0, 6)}...
                {transaction.member_id.slice(-4)}
              </a>
            </td>
            <td>{transaction.space_id}</td>
            <td>{moment(transaction.entry).format('DD/MM/YYYY hh:mm A')}</td>
            <td>{moment(transaction.exit).format('DD/MM/YYYY hh:mm A')}</td>
            <td>{transaction.duration}</td>
          </tr>
        ))}
      </tbody>
    </StripedTable>
  );
}

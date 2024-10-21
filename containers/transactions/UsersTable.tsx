import {
  Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Text
} from '@tremor/react';
import { User } from '../../types/user';

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>First</TableHeaderCell>
          <TableHeaderCell>Last</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Entry</TableHeaderCell>
          <TableHeaderCell>Exit</TableHeaderCell>
          <TableHeaderCell>Make & Model</TableHeaderCell>
          <TableHeaderCell>Plate</TableHeaderCell>
          <TableHeaderCell>Member ID</TableHeaderCell>
          <TableHeaderCell>EV</TableHeaderCell>
          <TableHeaderCell>Rate Code</TableHeaderCell>
          <TableHeaderCell>Total LSK</TableHeaderCell>
          <TableHeaderCell>Location</TableHeaderCell>
          <TableHeaderCell>Space No.</TableHeaderCell>
          <TableHeaderCell>Payment Status</TableHeaderCell>
          <TableHeaderCell>Payment Method</TableHeaderCell>
          <TableHeaderCell>Duration</TableHeaderCell>
          <TableHeaderCell>Notes</TableHeaderCell>
          <TableHeaderCell>Attendant ID</TableHeaderCell>
          <TableHeaderCell>Booking Reference</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user, userIdx) => (
          <TableRow key={user.id}>
            {Object.values(user)?.map((val, idx) => (
              <TableCell key={`${userIdx}-${idx}`}>
                <Text>{`${val}`}</Text>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

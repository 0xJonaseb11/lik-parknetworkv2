export interface IParkingTransaction {
  id: number;
  transaction_id: number;
  entry: string;
  exit: string;
  member_id: number;
  ev: string;
  total_lsk: string;
  duration: string;
  rate_code: string;
  attendant_id: string;
  location: string;
  space_number: string;
  payment_status: string;
  payment_method: string;
  make_model: string;
  plate: string;
  booking_reference: string;
  notes: string;
}

export interface IMembershipTransaction {
  id: number;
  user_id: number;
  membership_id: number;
  transaction_type: string;
  transaction_time: string;
  amount_paid: number;
  blockchain_hash: string;
}

export interface IParkingLotAdditionTransactions {
  id: number;
  user_id: number;
  parking_lot_name: string;
  parking_space_id: number;
  location: string;
  date_added: Date;
  blockchain_hash: number;
}

export interface IParkSpaceTransactions {
  transaction_id: string;
  member_id: string;
  space_id: string;
  entry: string;
  exit: string;
  duration: string;
}
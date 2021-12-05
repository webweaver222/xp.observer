import { Document, model, Schema } from "mongoose";

interface TokenTransferEvent {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  from: string;
  contractAddress: string;
  to: string;
  value: string;
  tokenName: string;
  tokenSymbol: string;
  tokenDecimal: string;
  transactionIndex: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  cumulativeGasUsed: string;
  input: string;
  confirmations: string;
}

interface Transfer {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string | DecodedInput;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  amount?: string;
}

interface DecodedInput {
  name: string;
  params: {
    name: string;
    value: string;
    type: string;
  }[];
}

interface TokenTransferEventResponse {
  data: {
    status: string;
    message: string;
    result: TokenTransferEvent[] & { hasNewTransfers: boolean };
  };
}

interface DBTransferEvent extends Document {
  block: string;
  wallet: string;
}

interface RecentTransaction extends Document {
  block: string;
  hash: string;
}

const schema = new Schema<DBTransferEvent>({
  block: { type: String, required: true },
  wallet: { type: String, required: true },
});

const schemaTrx = new Schema<RecentTransaction>({
  block: { type: String, required: true },
  hash: { type: String, required: true },
});

const TransferEventModel = model<DBTransferEvent>("TransferEvent", schema);

const RecentTransactionModel = model<RecentTransaction>(
  "RecentTransaction",
  schemaTrx
);

export { TransferEventModel, RecentTransactionModel };
export type {
  TokenTransferEvent,
  TokenTransferEventResponse,
  DBTransferEvent,
  RecentTransaction,
  Transfer,
  DecodedInput,
};

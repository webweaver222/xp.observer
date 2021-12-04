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

const schema = new Schema<DBTransferEvent>({
  block: { type: String, required: true },
  wallet: { type: String, required: true },
});

const TransferEventModel = model<DBTransferEvent>("TransferEvent", schema);

export default TransferEventModel;
export type { TokenTransferEvent, TokenTransferEventResponse, DBTransferEvent };

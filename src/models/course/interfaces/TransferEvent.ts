import { Document, model, Schema } from "mongoose";

interface TransferEvent extends Document {
  block: string;
  wallet: string;
}

const schema = new Schema<TransferEvent>({
  block: { type: String, required: true },
  wallet: { type: String, required: true },
});

const TransferEventModel = model<TransferEvent>("TransferEvent", schema);

export default TransferEventModel;

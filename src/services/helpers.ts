import TransferEventModel, {
  TokenTransferEvent,
} from "../models/TokenTransferEvent";

export const storeResulst = (results: TokenTransferEvent[][]) => {
  Promise.all(
    results.map((result: TokenTransferEvent[]) => {
      if (result.length > 0) {
      }
    })
  );
};

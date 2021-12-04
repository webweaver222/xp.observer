import TransferEventModel, {
  DBTransferEvent,
} from "../../models/TokenTransferEvent";

export default {
  findTransferEvent: function (wallet: string) {
    return TransferEventModel.findOne({ wallet });
  },

  updateTransferEvent: async function (
    document: DBTransferEvent | null,
    lastBlock: string,
    wallet: string
  ) {
    try {
      if (document) {
        if (document.block !== lastBlock)
          document = await TransferEventModel.findOneAndUpdate(
            { wallet },
            { block: lastBlock },
            { new: true, useFindAndModify: false }
          );
      } else {
        document = new TransferEventModel({
          block: lastBlock,
          wallet,
        });
        await document.save();
      }
    } catch (e) {
      console.log(e, `DataMapper, function:updateTransferEvent()`);
    }

    return document;
  },
};

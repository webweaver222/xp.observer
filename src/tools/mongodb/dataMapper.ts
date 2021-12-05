import {
  TransferEventModel,
  RecentTransactionModel,
  DBTransferEvent,
  RecentTransaction,
} from "../../models/TokenTransferEvent";

export default {
  findTransferEvent: function (wallet: string) {
    return TransferEventModel.findOne({ wallet });
  },

  findRecentTransaction: function () {
    return RecentTransactionModel.findOne({});
  },

  updateRecentTransaction: async function (
    document: RecentTransaction | null,
    lastBlock: string,
    hash: string
  ) {
    try {
      if (!document) {
        document = new RecentTransactionModel({
          block: lastBlock,
          hash,
        });
        await document.save();
        return;
      }

      if (document.block !== lastBlock)
        await document.updateOne({
          block: lastBlock,
        });
    } catch (e) {
      console.log(e, `DataMapper, function:updateTransferEvent()`);
      throw `${e} ,, DataMapper, function:updateTransferEvent()`;
    }
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

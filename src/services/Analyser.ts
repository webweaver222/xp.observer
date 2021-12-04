import { TokenTransferEvent } from "../models/TokenTransferEvent";

class Analyser {
  data: TokenTransferEvent[][];

  constructor(results: TokenTransferEvent[][]) {
    this.data = results;
  }

  filterByCriteria(
    criteria: Object = {
      value: 1,
    }
  ) {
    return this.data;
  }
}

const analyzer = (results: TokenTransferEvent[][]) => new Analyser(results);

export default analyzer;
export type { Analyser };

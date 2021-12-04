class Collector {
  exprectedItems: number;
  results: any[][] = [];
  count: number = 0;
  timer: NodeJS.Timeout | null = null;
  onDone?: (error?: string, results?: any[][]) => void;

  constructor(exprectedItems: number) {
    this.exprectedItems = exprectedItems;
    return this;
  }

  done(cb: (error?: string, results?: any[][]) => void) {
    this.onDone = cb;
    return this;
  }

  collect(item: any[]) {
    this.results.push(item);
    if (
      this.results.length === this.exprectedItems &&
      this.timer &&
      this.onDone
    ) {
      this.onDone(undefined, this.results);
    }
  }

  timeout(time: number) {
    this.timer = setTimeout(() => {
      this.onDone && this.onDone("Transfer fetch timed out");
      this.timer = null;
    }, time * 1000);
    return this;
  }
}

const collect = (exprectedItems: number) => new Collector(exprectedItems);

export default collect;
export type { Collector };

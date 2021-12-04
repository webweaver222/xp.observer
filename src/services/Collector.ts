class Collector {
  exprectedItems: number;
  results: any[][] = [];
  count: number = 0;
  timer: NodeJS.Timeout | null = null;
  onDone?: (error?: string, results?: any[][]) => void;
  finished: boolean = false;

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
      clearTimeout(this.timer);
      this.finished = true;
      this.onDone(undefined, this.results);
    }
  }

  timeout(time: number) {
    this.timer = setTimeout(() => {
      this.finished = true;
      this.timer = null;
      this.onDone && this.onDone("Transfer fetch timed out");
    }, time * 1000);
    return this;
  }
}

const collect = (exprectedItems: number) => new Collector(exprectedItems);

export default collect;
export type { Collector };

export class PageDataDto<T> {
  total: number;
  list: T[];

  constructor(total: number, list: T[]) {
    this.total = total;
    this.list = list;
  }
}

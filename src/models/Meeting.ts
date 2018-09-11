export class Meeting {
  public actual: any;
  public created: string;
  public date: string;
  public history: any[];

  constructor() {
    this.actual = {},
    this.created = '';
    this.date = '';
    this.history = [];
  }
}

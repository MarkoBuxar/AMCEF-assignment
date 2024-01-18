import { Reference } from '../Utils/DBInitHandler';

export abstract class TableBuilder {
  public name: string;
  public db: any;
  public ref: Reference[];
  public static order: number;

  constructor(database, ref) {
    this.db = database;
    this.ref = ref;
  }

  public async build() {
    return;
  }
}

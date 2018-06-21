export class ProfitAndLossTable{
  public id:number;
  public title:string;
  public isGroup:boolean;
  public amount:number;
  public spaces:number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

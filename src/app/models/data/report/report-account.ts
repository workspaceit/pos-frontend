export class ReportAccount{
  public id:number;
  public title:string;
  public isGroup:boolean;
  public child:ReportAccount[];
  public amount:number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

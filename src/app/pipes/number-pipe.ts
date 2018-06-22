import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name:'mathabs'})
export class NumberPipe implements PipeTransform {
  transform(value:number):number{
    return Math.abs(value);
  }
}

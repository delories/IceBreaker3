import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'infosOrderBy'
})
export class InfosOrderByPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return null;
  }

}

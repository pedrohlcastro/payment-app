import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform  {
  transform(value: string, size: number, complement: string): string {
    const limit = size ? size : 10;
    const trail = complement ? complement : '...';
    
    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}

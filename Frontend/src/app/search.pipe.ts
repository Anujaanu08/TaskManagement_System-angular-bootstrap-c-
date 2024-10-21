import { Pipe, PipeTransform } from '@angular/core';
import { Task } from './taskr-service.service';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Task[], ...args: string[]): Task[] {
    const searchtext=args[0]
    return value.filter(a=>a.title.toLowerCase().includes(searchtext.toLowerCase()) || a.description.toLowerCase().includes(searchtext.toLowerCase()))
  }

}

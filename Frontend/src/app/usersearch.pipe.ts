import { Pipe, PipeTransform } from '@angular/core';
import { User } from './user.service';

@Pipe({
  name: 'usersearch'
})
export class UsersearchPipe implements PipeTransform {

  transform(value: User[], ...args: string[]): User[] {
    const searchtext=args[0]
    return value.filter(a=>a.name.toLowerCase().includes(searchtext.toLowerCase())|| a.email.toLowerCase().includes(searchtext.toLowerCase()))
  }


}

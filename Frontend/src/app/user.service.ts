import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url = "http://localhost:5091/api/Users";
  
  constructor(private http:HttpClient) { }

getUsers(){
return this.http.get<User[]>(this.url);
}

getUser(userId : number){
  return this.http.get<User[]>(this.url + "/" + userId)
  }

addUser(user:User){
return this.http.post<User[]>(this.url,user)
}

edituser(user:User){
return this.http.put(this.url+'/'+user.id, user)
}

deleteuser(userId : number){
return this.http.delete(this.url + "/" + userId)
}

}

export interface User{
  id:number;
  name:string;
  phone:string;
  email:string;
  address:string;
}
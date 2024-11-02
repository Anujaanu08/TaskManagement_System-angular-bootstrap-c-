import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './taskr-service.service';

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
  return this.http.get<User>(this.url + "/" + userId)
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
  password:string;
  email:string;
  address:Address;
  tasks?:Task []
}

export interface Address{
  id:number;
  addressline1:string;
  addressline2:string;
  city:string;
  userId? : number;
}
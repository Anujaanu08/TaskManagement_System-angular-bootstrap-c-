import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TaskrServiceService {

  url = "http://localhost:5091/api/TaskItems"
  constructor(private http:HttpClient) { }

getTasks(){
return this.http.get<Task[]>(this.url);
}

getTask(taskId : number){
  return this.http.get<Task[]>(this.url + "/" + taskId)
  }

addTask(task:Task){
return this.http.post<Task[]>(this.url,task)
}

edittask(task:Task){
return this.http.put(this.url+'/'+task.id, task)
}

deletetask(taskId : number){
return this.http.delete(this.url + "/" + taskId)
}

}


export  interface Task{
  id:number,
  title:string,
  description : string,
  dueDate : string,
  priority : string,
  assigneeId:number,
  assignee?:User;
}
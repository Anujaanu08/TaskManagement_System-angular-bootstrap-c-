import { Component, OnInit } from '@angular/core';
import { TaskrServiceService } from '../taskr-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit {
  tasks: any[] = [];
  searchdata: string = '';

  constructor(
    private taskservice: TaskrServiceService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    this.gettasks();

  }

  gettasks() {
    this.taskservice.getTasks().subscribe(option =>{
      this.tasks = option
      console.log(this.tasks);
      
    } )
  }
  
  Addtask() {
    this.router.navigate(['add']);
  }

  editTask(taskid:number) {
    this.router.navigate(['edit/'+ taskid]);
  }

  deleteTask(taskId: number) {
    this.taskservice
      .deletetask(taskId)
      .subscribe((data: any) =>{this.toastr.success('task deleted')
        this.gettasks()
      });

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task, TaskrServiceService } from '../taskr-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css',
})
export class EditTaskComponent implements OnInit {
  taskform: FormGroup;
  taskid: any;
  users: User[] = [];
  
  constructor(
    private fb: FormBuilder,
    private taskService: TaskrServiceService,
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private toastr:ToastrService
  ) {
    this.taskid = this.route.snapshot.paramMap.get('taskid');

    this.taskform = this.fb.group({
      id: [''],
      title: ['', [Validators.required]],
      description: [''],
      dueDate: ['', [Validators.required]],
      priority: ['', [Validators.required]],
      assigneeId: ['']
    });
  }

  ngOnInit(): void {
    this.userService.getUsers().subscribe((data:User[]) => (this.users = data));
    this.taskService.getTask(this.taskid).subscribe(
      (data: any) => {
        let duedate = new Date(data.dueDate).toISOString().slice(0, 10);

        this.taskform.patchValue({
          id: this.taskid,
          title: data.title,
          description: data.description,
          dueDate: duedate,
          priority: data.priority,
          assigneeId:data.assigneeId
        });
      },
      (error) => {
        this.toastr.error('Task not found');
      }
    );
  }

  cancel() {
    this.taskform.reset();
    this.router.navigate(['/'])
     }

  onsubmit() {
    const task = this.taskform.value;
    this.taskService.edittask(task).subscribe(data=>{
      this.toastr.success("updted successfully ...")
      this.router.navigate(["/"]);
    }
    );
    
  }
}

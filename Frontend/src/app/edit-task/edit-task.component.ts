import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      assigneeId: [''],
      checklists:this.fb.array([])
    });
  }

  get myChecklist(): FormArray{
    return this.taskform.get("checklists") as FormArray
    }
    
    addChecklist(){
      this.myChecklist.push(this.fb.group({
        name:[''],
        isDone:[false]
      }))
    }
    
    removechecklist(index:number){
      this.myChecklist.removeAt(index);
    }
    
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data:User[]) => (this.users = data));
    this.taskService.getTask(this.taskid).subscribe(
      (data: Task) => {
        let duedate = new Date(data.dueDate).toISOString().slice(0, 10);
        
        for (let index = 0; index < data.checklists.length; index++) {
          const element =  data.checklists[index];
          this.myChecklist.push(this.fb.group({id:element.id ,name:[element.name], isDone:[element.isDone], taskId:data.id}))
         }

        this.taskform.patchValue({
          id: this.taskid,
          title: data.title,
          description: data.description,
          dueDate: duedate,
          priority: data.priority,
          assigneeId:data.assigneeId,
          checklists : this.myChecklist
         });
        
        
      },
      (error) => {
        this.toastr.error('Task not found');
      }
    );
  }

  cancel() {
    this.taskform.reset();
    this.router.navigate(['/tasks'])
     }

  onsubmit() {
    const task = this.taskform.value;
    this.taskService.edittask(task).subscribe(data=>{
      this.toastr.success("updted successfully ...")
      this.router.navigate(["/tasks"]);
    }
    );
    
  }
}

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskrServiceService } from '../taskr-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css',
})
export class AddtaskComponent implements OnInit {
  users: User[] = [];
  taskform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskrServiceService,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {
    let today = new Date().toISOString().slice(0, 10);
    this.taskform = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: ['',[Validators.required]],
      priority: ['high', [Validators.required]],
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
  }

  cancel() {
    this.taskform.reset();
    this.router.navigate(['/tasks']);
  }

  onsubmit() {
    this.taskService
      .addTask(this.taskform.value)
      .subscribe((data) => this.toastr.success('task added successfully'));
    this.router.navigate(['/tasks']);
  }
}

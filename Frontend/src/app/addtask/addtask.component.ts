import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskrServiceService } from '../taskr-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrl: './addtask.component.css',
})
export class AddtaskComponent {

  taskform: FormGroup;

  constructor(
    private fb: FormBuilder,
    private taskService: TaskrServiceService,
    private router: Router,
    private toastr :ToastrService
  ) {
    let today = new Date().toISOString().slice(0,10);
    this.taskform = this.fb.group({
      title: ['', [Validators.required]],
      description: [''],
      dueDate: [today, [Validators.required]],
      priority: ['high', [Validators.required]],
    });
  }

  cancel() {
   this.taskform.reset();
   this.router.navigate(['/'])
    }

  onsubmit() {
    this.taskService
      .addTask(this.taskform.value)
      .subscribe((data) =>this.toastr.success('task added successfully'));
    this.router.navigate(['/']);
  }
}
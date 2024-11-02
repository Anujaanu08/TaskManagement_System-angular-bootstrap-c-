import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../user.service';
import { Task } from '../taskr-service.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  userform: FormGroup;
  isEdit: boolean = false;
  userid: number;
  addressid: number = 0;
  tasks: Task[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.userid = Number(this.route.snapshot.paramMap.get('userid'));

    if (this.userid) {
      this.isEdit = true;
    }

    this.userform = this.fb.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      address: this.fb.group({
        addressline1: ['', [Validators.required]],
        addressline2: [''],
        city: [''],
      }),
    });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.userService.getUser(this.userid).subscribe(
        (data: any) => {
          this.userform.patchValue({
            name: data.name,
            password: data.password,
            email: data.email,
            address: {
              addressline1: data.address.addressline1,
              addressline2: data.address.addressline2,
              city: data.address.city,
            }
          });
          this.tasks = data.tasks;
          this.addressid = data.address.id;
        },
        (error) => {
          this.toastr.error('User not found');
        }
      );
    }
  }

  cancel() {
    this.userform.reset();
    this.router.navigate(['/users']);
  }

  onsubmit() {
    if (this.isEdit) {
      const user: User = this.userform.value;
      user.id = this.userid;
      user.address.id = this.addressid;
      user.address.userId = this.userid;

      this.userService.edituser(user).subscribe((data) => {
        this.toastr.success('User updated successfully...');
        this.router.navigate(['/users']);
      });
    } else {
      this.userService
        .addUser(this.userform.value)
        .subscribe((data) => this.toastr.success('user added successfully'));
      this.router.navigate(['/users']);
    }
  }
}

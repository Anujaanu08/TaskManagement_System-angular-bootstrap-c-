import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User, UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent implements OnInit {
  userform: FormGroup;
  isEdit: boolean = false;
  userid: number;

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
      phone: ['', [Validators.required]],
      email: ['', [Validators.email]],
      address: [''],
    });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.userService.getUser(this.userid).subscribe(
        (data: any) => {
          this.userform.patchValue({
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
          });
        },
        (error) => {
          this.toastr.error('User not found');
        }
      );
    }
  }

  cancel() {
    this.userform.reset();
    this.router.navigate(['/users'])
  }

  onsubmit() {
    if (this.isEdit) {
      const user: User = this.userform.value;
      user.id= this.userid;
      this.userService.edituser(user).subscribe(data =>{
        this.toastr.success('User updated successfully...')
        this.router.navigate(['/users'])
      })
    }
    else {
      this.userService
        .addUser(this.userform.value)
        .subscribe((data) => this.toastr.success('user added successfully'));
      this.router.navigate(['/users']);
    }
  }

}

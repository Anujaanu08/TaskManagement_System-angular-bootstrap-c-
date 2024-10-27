import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) { }

  users: any[] = [];
  searchdata: string='';

  ngOnInit(): void {
    this.getUsers();
 }

  getUsers() {
    this.userService.getUsers().subscribe(data =>{
      this.users = data
      console.log(this.users);
    }
    )
  }

  Adduser() {
    this.router.navigate(['/userform'])
  }

  editUser(userid: number) {
    this.router.navigate(['userform/' + userid])
  }

  deleteUser(userid: number) {
    this.userService.deleteuser(userid).subscribe(data => {
      this.toastr.success("User deleted successfully...")
      this.getUsers();
    })
  }

}

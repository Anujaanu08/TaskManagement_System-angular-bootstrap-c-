import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { EditTaskComponent } from './edit-task/edit-task.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path : '', component:HomeComponent},
  {path : 'tasks', component:ListComponent},
  {path : 'add', component:AddtaskComponent},
  {path : 'edit/:taskid', component:EditTaskComponent},

  {path : 'users', component:UserListComponent},
  {path : 'userform', component:UserFormComponent},
  {path : 'userform/:userid', component:UserFormComponent},

  {path : 'home', component:HomeComponent},
  {path : 'register', component:RegisterComponent},
  {path : 'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

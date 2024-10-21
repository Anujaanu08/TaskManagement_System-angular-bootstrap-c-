import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskrServiceService } from './taskr-service.service';
import {  HttpClientModule} from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddtaskComponent } from './addtask/addtask.component';
import{FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { EditTaskComponent } from './edit-task/edit-task.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    AddtaskComponent,
    SearchPipe,
    EditTaskComponent,
    UserListComponent,
    UserFormComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,CommonModule,ReactiveFormsModule,FormsModule, BrowserAnimationsModule, 
    ToastrModule.forRoot({
      closeButton:true,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
    }) 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

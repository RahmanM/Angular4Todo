import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; 

import { AppComponent } from './app.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoService } from "./services/TodoService";
import { TodoCountsComponent } from './todo-counts/todo-counts.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoHeaderComponent,
    TodoDetailComponent,
    TodoCountsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

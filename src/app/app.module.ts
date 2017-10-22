import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoDetailComponent } from './todo-detail/todo-detail.component';
import { TodoService } from "./services/TodoService";
import { TodoCountsComponent } from './todo-counts/todo-counts.component';
import { TodoSearchComponent } from './todo-search/todo-search.component';
import { TodoPipePipe } from './todo-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoHeaderComponent,
    TodoDetailComponent,
    TodoCountsComponent,
    TodoSearchComponent,
    TodoPipePipe
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }

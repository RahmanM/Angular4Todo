import { Component, OnInit } from '@angular/core';
import { Todo } from "../modals/Todo";
import { TodoService } from "../services/TodoService";

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
})
export class TodoDetailComponent implements OnInit {

  todoList : Array<Todo>=[];
  
  constructor(private todoService: TodoService) {

    todoService.todoAddedObservable.subscribe(
      todo => {
        this.todoList.push(todo);
        todoService.announceTodoListChanged(this.todoList);
      });
   }

  ngOnInit() {
  }

  removeTodo(todo: Todo){
    this.todoList.splice(this.todoList.indexOf(todo), 1);
    this.todoService.announceTodoListChanged(this.todoList);
  }

  todoChanged(todo: Todo){
    console.log("inside details" + todo);

    this.todoList.forEach(element => {
      if(element.description===todo.description){
        element.completed=todo.completed;
        this.todoService.announceTodoListChanged(this.todoList);
      }

    });
  }

  showDetails(){
    return this.todoList && this.todoList.length>0;
  }
 
}

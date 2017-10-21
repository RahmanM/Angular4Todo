import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from "../modals/Todo";
import { TodoService } from "../services/TodoService";


@Component({
  selector: 'todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  todo: Todo = new Todo("", false, false);;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(
      new Todo(todo.Description, false, true)
    ).subscribe(a=>  this.todoService.announceTodoAdded(a));
  }
}

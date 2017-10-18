import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo } from "../modals/Todo";
import { TodoService } from "../services/TodoService";


@Component({
  selector: 'todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  todo: Todo = new Todo();;

  constructor(private todoService: TodoService) {
  }

  ngOnInit() {
  }

  addTodo(todo) {
    this.todoService.announceTodoAdded({ completed: false, description: todo.description, show: true });
    this.todo.description = null;
  }
}

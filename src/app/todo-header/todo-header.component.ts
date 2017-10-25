import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo, Category } from "../modals/Todo";
import { TodoService } from "../services/TodoService";


@Component({
  selector: 'todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  todo: Todo = new Todo("", false, false, 0);
  categories = new Array<Category>();

  constructor(private todoService: TodoService) {
    this.todoService.loadCategories().subscribe(c=> this.categories = c);
  }

  ngOnInit() {    
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(
      new Todo(todo.Description, false, true, todo.CategoryId)
    ).subscribe(a=>  this.todoService.announceTodoAdded(a));
  }
}

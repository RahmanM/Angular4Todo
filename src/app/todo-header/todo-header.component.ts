import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Todo, Category } from "../modals/Todo";
import { TodoService } from "../services/TodoService";
import { NotificationService } from "../services/NotificationService";


@Component({
  selector: 'todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})
export class TodoHeaderComponent implements OnInit {

  todo: Todo = new Todo("", false, false, 1);
  categories = new Array<Category>();

  constructor(private todoService: TodoService, private notificationService : NotificationService) {
    this.todoService.loadCategories().subscribe(c=> this.categories = c);
  }

  ngOnInit() {    
  }

  addTodo(todo:Todo) {
    this.todoService.addTodo(
      new Todo(todo.Description, false, true, todo.CategoryId)
    ).subscribe(a=>  {
      this.notificationService.notifyTodoAdded(a)
      this.todo.CategoryId = 1;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TodoService } from "../services/TodoService";
import { Category } from "../modals/Todo";
import { NotificationService } from "../services/NotificationService";

@Component({
  selector: 'todo-category',
  templateUrl: './todo-category.component.html',
  styleUrls: ['./todo-category.component.css']
})
export class TodoCategoryComponent implements OnInit {

  categories: Array<Category>;

  constructor(private todoService: TodoService, private notificationService : NotificationService) {

    this.todoService.loadCategories().subscribe(
      c => {
        this.categories = c
        console.log("categories=>", this.categories);
      }
    );

    this.notificationService.todoAddedObservable.subscribe(
      todo => {
        this.categories.forEach(element => {
          if (element.Id === todo.CategoryId) {
            element.Count++;
          }
        });
      });

    this.notificationService.todoDeletedObservable.subscribe(todo => {
      this.categories.forEach(element => {
        if (element.Id === todo.CategoryId) {
          element.Count--;
        }
      });

    })
  }

  ngOnInit() {

  }

  categorySelected(id:number){
    this.notificationService.notifyselectedCategoryChanged(id);
  }

  categoryReset(){
    this.notificationService.notifyselectedCategoryChanged(0);
    console.log("clicked")
  }

}

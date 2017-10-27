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
  selectedIndex : number;

  constructor(private todoService: TodoService, private notificationService : NotificationService) {

    this.todoService.loadCategories().subscribe(
      c => {
        this.categories = c
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

    });
    
  }

  ngOnInit() {

  }

  categorySelected(id:number, rowIndex){
    this.notificationService.notifyselectedCategoryChanged(id);
    this.selectedIndex = rowIndex;
  }

  categoryReset(){
    this.notificationService.notifyselectedCategoryChanged(0);
    this.selectedIndex = -1;
  }

}

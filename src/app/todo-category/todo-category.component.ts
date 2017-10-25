import { Component, OnInit } from '@angular/core';
import { TodoService } from "../services/TodoService";
import { Category } from "../modals/Todo";

@Component({
  selector: 'todo-category',
  templateUrl: './todo-category.component.html',
  styleUrls: ['./todo-category.component.css']
})
export class TodoCategoryComponent implements OnInit {

  categories : Array<Category>;

  constructor(private todoService:TodoService) {
      this.todoService.loadCategories().subscribe(
        c=> {
          this.categories = c
          console.log("categories=>",  this.categories);
        }
      );
   }

  ngOnInit() {

  }

}

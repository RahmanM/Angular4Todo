import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { Todo, Category } from "../modals/Todo";

// will be called from the components to anounce changes to their list. This enables sibling communications.
@Injectable()
export class NotificationService {
 
  // Observable sources
  private todoAdded = new Subject<Todo>();
  private todoDeleted = new Subject<Todo>();
  private todoListChanged = new Subject<Array<Todo>>();
  private categoryListChanged = new Subject<Array<Category>>();
  private selectedCategoryChanged = new Subject<number>();

  // Observable  streams
  todoAddedObservable : Observable<Todo> = this.todoAdded.asObservable();
  todoDeletedObservable : Observable<Todo> = this.todoDeleted.asObservable();
  todoListChangedObservable : Observable<Array<Todo>> = this.todoListChanged.asObservable();
  categoriesChangedObservable : Observable<Array<Category>> = this.categoryListChanged.asObservable();
  selectedCategoryChangedObservable : Observable<number> = this.selectedCategoryChanged.asObservable();
 
  notifyTodoAdded(todo: Todo) {
    this.todoAdded.next(todo);
  }

  notifyTodoDeleted(todo: Todo) {
    this.todoDeleted.next(todo);
  }

  notifyTodoListChanged(list: Array<Todo>) {
    this.todoListChanged.next(list);
  }

  notifyCategoryListChanged(list: Array<Category>) {
    this.categoryListChanged.next(list);
  }

  notifyselectedCategoryChanged(id:number){
    this.selectedCategoryChanged.next(id);
  }

}

import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Todo } from "../modals/Todo";
import { Observable } from "rxjs/Observable";

@Injectable()
export class TodoService {
 
  // Observable sources
  private todoAdded = new Subject<Todo>();
  private todoListChanged = new Subject<Array<Todo>>();
 
  // Observable  streams
  todoAddedObservable : Observable<Todo> = this.todoAdded.asObservable();
  todoListChangedObservable : Observable<Array<Todo>> = this.todoListChanged.asObservable();
 
  announceTodoAdded(todo: Todo) {
    this.todoAdded.next(todo);
  }

  announceTodoListChanged(list: Array<Todo>) {
    this.todoListChanged.next(list);
  }

}
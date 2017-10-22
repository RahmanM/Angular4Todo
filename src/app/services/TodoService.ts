
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Todo } from "../modals/Todo";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TodoService {
 
  // Observable sources
  private todoAdded = new Subject<Todo>();
  private todoListChanged = new Subject<Array<Todo>>();
  private todoList = new Subject<Array<Todo>>();

  private url : string = "http://localhost/Angular4Todo/api/todo";
  // private url : string = "http://localhost:5898/api/todo";
 
  constructor(private httpClient : HttpClient) {
    
  }
 
  // Observable  streams
  todoAddedObservable : Observable<Todo> = this.todoAdded.asObservable();
  todoListChangedObservable : Observable<Array<Todo>> = this.todoListChanged.asObservable();
 
  announceTodoAdded(todo: Todo) {
    this.todoAdded.next(todo);
  }

  announceTodoListChanged(list: Array<Todo>) {
    this.todoListChanged.next(list);
  }

  loadTodos = () : Observable<Array<Todo>> => {
    var response = this.httpClient.get<Array<Todo>>(this.url);
    return response;
  }

  addTodo = (todo : Todo) : Observable<Todo> => {
    var response = this.httpClient.post<Todo>(this.url, todo);
    return response;
  }

  deleteTodo = (id : string) : Observable<number> => {
    var response = this.httpClient.delete<any>(this.url + "/" + id.split("/")[1]);
    return response;;
  }

  updateTodo = (todo:Todo) : Observable<Todo> => {
    var response = this.httpClient.put<Todo>(this.url, todo);
    return response;
  }

}
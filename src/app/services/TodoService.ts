
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Todo } from "../modals/Todo";
import { Observable } from "rxjs/Observable";
import { Http, Response } from "@angular/http";
import "rxjs/add/operator/map";

@Injectable()
export class TodoService {
 
  // Observable sources
  private todoAdded = new Subject<Todo>();
  private todoListChanged = new Subject<Array<Todo>>();
  private todoList = new Subject<Array<Todo>>();

  private url : string = "http://localhost/Angular4Todo/api/todo";
  // private url : string = "http://localhost:5898/api/todo";
 
  constructor(private http : Http) {
    
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
    var response = this.http.get(this.url)
                            .map(response => <Array<Todo>> response.json());
    return response;
  }

  addTodo = (todo : Todo) : Observable<Todo> => {
    var response = this.http.post(this.url, todo).map(response => <Todo> response.json());
    return response;
  }

  deleteTodo = (id : string) : Observable<number> => {
    var response = this.http.delete(this.url + "/" + id.split("/")[1]);
    return response.map(response => response.status);;
  }

  updateTodo = (todo:Todo) : Observable<Todo> => {
    console.log(todo);
    var response = this.http.put(this.url, todo);
    return response.map(response => <Todo> response.json());;
  }

}
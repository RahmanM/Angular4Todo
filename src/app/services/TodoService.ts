
import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';
import { Todo, Category } from "../modals/Todo";
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class TodoService {
 
  // Observable sources
  private todoAdded = new Subject<Todo>();
  private todoListChanged = new Subject<Array<Todo>>();
  private todoList = new Subject<Array<Todo>>();
  private categoryListChanged = new Subject<Array<Category>>();

  private baseUrl : string = "http://localhost/Angular4Todo/api/";
  // private url : string = "http://localhost:5898/api/todo";
 
  constructor(private httpClient : HttpClient) {
    
  }
 
  // Observable  streams
  todoAddedObservable : Observable<Todo> = this.todoAdded.asObservable();
  todoListChangedObservable : Observable<Array<Todo>> = this.todoListChanged.asObservable();
  categoriesChangedObservable : Observable<Array<Category>> = this.categoryListChanged.asObservable();
 
  announceTodoAdded(todo: Todo) {
    this.todoAdded.next(todo);
  }

  announceTodoListChanged(list: Array<Todo>) {
    this.todoListChanged.next(list);
  }

  announceCategoryListChanged(list: Array<Category>) {
    this.categoryListChanged.next(list);
  }

  loadTodos = () : Observable<Array<Todo>> => {
    var response = this.httpClient.get<Array<Todo>>(this.baseUrl + "todo");
    return response;
  }

  addTodo = (todo : Todo) : Observable<Todo> => {
    var response = this.httpClient.post<Todo>(this.baseUrl + "todo", todo);
    return response;
  }

  deleteTodo = (id : string) : Observable<number> => {
    var response = this.httpClient.delete<any>(this.baseUrl + "todo/" + id.split("/")[1]);
    return response;;
  }

  updateTodo = (todo:Todo) : Observable<Todo> => {
    var response = this.httpClient.put<Todo>(this.baseUrl + "todo", todo);
    return response;
  }

  loadCategories = () : Observable<Array<Category>> => {
    var response = this.httpClient.get<Array<Category>>(this.baseUrl + "category/GetCategoriesGrouped");
    return response;
  }

}
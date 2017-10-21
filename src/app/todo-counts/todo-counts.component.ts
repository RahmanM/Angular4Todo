import { Component, OnInit } from '@angular/core';
import { Todo } from "../modals/Todo";
import { TodoService } from "../services/TodoService";

@Component({
  selector: 'todo-counts',
  templateUrl: './todo-counts.component.html',
  styleUrls: ['./todo-counts.component.css']
})
export class TodoCountsComponent implements OnInit {

  todoList : Array<Todo> = [];

  totalTodos:number=0;
  totalCompleted:number=0;
  totalNotCompleted:number=0;
  
   constructor(private todoService:TodoService) {

      todoService.todoListChangedObservable.subscribe(list=> {
        this.todoList = list;
        this.totalTodos =  this.todoList.length;
        this.totalCompleted = this.todoList.filter(t=> t.Completed===true).length;
        this.totalNotCompleted = this.totalTodos - this.totalCompleted;
      });
   }

  ngOnInit() {
  }

}

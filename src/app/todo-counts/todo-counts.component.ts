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

  totalTodos:number;
  totalCompleted:number;
  totalNotCompleted:number;
  
   constructor(private todoService:TodoService) {

      todoService.todoListChangedObservable.subscribe(list=> {
        console.log(list);
        this.todoList = list;

        this.totalTodos =  this.todoList.length;
        this.totalCompleted = this.todoList.filter(t=> t.completed===true).length;
        this.totalNotCompleted = this.totalTodos - this.totalCompleted;
      });

     
   }

  ngOnInit() {
  }

}

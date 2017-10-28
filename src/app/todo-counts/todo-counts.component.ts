import { Component, OnInit } from '@angular/core';
import { Todo } from "../modals/Todo";
import { TodoService } from "../services/TodoService";
import { NotificationService } from "../services/NotificationService";

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
  
   constructor(private todoService:TodoService, private notificationService : NotificationService) {

      notificationService.todoListChangedObservable.subscribe(list=> {
        this.todoList = list;
        this.totalTodos =  this.todoList.length;
        this.totalCompleted = this.todoList.filter(t=> t.Completed===true).length;
        this.totalNotCompleted = this.totalTodos - this.totalCompleted;
      });
   }

  ngOnInit() {
  }

  showByCount(toShow: string){
      if(toShow === "all"){
        this.notificationService.notifyselectedCategoryChanged(0);
        // todo: also should clean the search filters?
      }

      // if(toShow === "done"){
      //   this.notificationService.notifyselectedCategoryChanged(0);
      //   // todo: also should clean the search filters?
      // }

      // if(toShow === "notdone"){
      //   this.notificationService.notifyselectedCategoryChanged(0);
      //   // todo: also should clean the search filters?
      // }
  }
}

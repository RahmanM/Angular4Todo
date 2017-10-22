import { Component, OnInit} from '@angular/core';
import { Todo } from "../modals/Todo";
import { TodoService } from "../services/TodoService";
import { fade, highlight } from "../todo-animations/Animation";

@Component({
  selector: 'todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.css'],
  animations: [
                fade,
                highlight
              ]
})
export class TodoDetailComponent implements OnInit {

  todoList : Array<Todo>=[];

  descriptionFilter : string;

  completedState : string;
  
  constructor(private todoService: TodoService) {

    /* Subscribing to todo added observable */
    todoService.todoAddedObservable.subscribe(
      todo => {
        this.todoList.push(todo);
        /* inform subscribers e.g. todo count component to update their details */
        todoService.announceTodoListChanged(this.todoList);
      });
   }

  ngOnInit() {
    /** Load todos form the database */
    this.todoService.loadTodos().subscribe(s=> {
      this.todoList = s;
      this.todoService.announceTodoListChanged(this.todoList);
    });
  }

  /** removes todo from the list and notifies the subscribers */
  removeTodo(todo: Todo){
    this.todoService.deleteTodo(todo.Id).subscribe(r=> {
      this.todoList.splice(this.todoList.indexOf(todo), 1);
      this.todoService.announceTodoListChanged(this.todoList);
    });   
  }

  /** Changes completed or not and notifies the subscribers */
  todoChanged(todo: Todo){
    this.todoList.forEach(element => {
      if(element.Id===todo.Id){
        element.Completed=todo.Completed;
   
        this.todoService.updateTodo(todo).subscribe(s=> {
          // broadcast the message through the shared service observable!
          this.todoService.announceTodoListChanged(this.todoList);
        })
      }
    });

    /** Applies custom animation based on checkbox toggling */
    if(todo.Completed){
      this.completedState = "completed";
      setTimeout(s=>
        this.completedState = "notcompleted",1000
      )
    }else{
      this.completedState = "notcompleted";
    }
  }

  /** To show the details or not */
  showDetails = () : boolean =>  {
    return this.todoList && this.todoList.length>0;
  }

  /** Emitted from the child search component this will be used in the ngFor to filter todos */
  applyFilter = (filter) => {
    this.descriptionFilter = filter;
  }
 
}

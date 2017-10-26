import { Component, OnInit} from '@angular/core';
import { Todo } from "../modals/Todo";
import { TodoService } from "../services/TodoService";
import { fade, highlight } from "../todo-animations/Animation";
import { NotificationService } from "../services/NotificationService";

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
  loading : boolean = false;
  categoryFilter : number;
  
  constructor(private todoService: TodoService, private notificationService : NotificationService) {

    /* Subscribing to todo added observable */
    notificationService.todoAddedObservable.subscribe(
      todo => {
        this.todoList.push(todo);
        /* inform subscribers e.g. todo count component to update their details */
        notificationService.notifyTodoListChanged(this.todoList);
      });

      // User has changed the cateogy id of the category component, so filter todos
      notificationService.selectedCategoryChangedObservable.subscribe(id=>{
        this.categoryFilter = id;
        console.log(id);
      })
   }

  ngOnInit() {
    this.loading = true;
    /** Load todos form the database */
    this.todoService.loadTodos().subscribe(s=> {
      this.todoList = s;
      this.notificationService.notifyTodoListChanged(this.todoList);
      this.loading = false;
    });
  }

  /** removes todo from the list and notifies the subscribers */
  removeTodo(todo: Todo){
    this.todoService.deleteTodo(todo.Id).subscribe(r=> {
      this.todoList.splice(this.todoList.indexOf(todo), 1);
      this.notificationService.notifyTodoListChanged(this.todoList);
      this.notificationService.notifyTodoDeleted(todo);
    });   
  }

  /** Changes completed or not and notifies the subscribers */
  todoChanged(todo: Todo){
    this.todoList.forEach(element => {
      if(element.Id===todo.Id){
        element.Completed=todo.Completed;
   
        this.todoService.updateTodo(todo).subscribe(s=> {
          // broadcast the message through the shared service observable!
          this.notificationService.notifyTodoListChanged(this.todoList);
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
    return this.todoList && this.todoList.length > 0;
  }

  /** Emitted from the child search component this will be used in the ngFor to filter todos */
  applyFilter = (filter) => {
    this.descriptionFilter = filter;
  }
 
}

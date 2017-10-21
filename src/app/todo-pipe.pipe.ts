import { Pipe, PipeTransform } from '@angular/core';
import { Todo } from "./modals/Todo";

@Pipe({
  name: 'todoPipe'
})
export class TodoPipePipe implements PipeTransform {

  transform(todos: Array<Todo>, filter:string):  Array<Todo> {
    if(!filter){
      return todos;
    }else{
      return todos.filter(item => item.Description.indexOf(filter)>-1);
    } 
  }
}

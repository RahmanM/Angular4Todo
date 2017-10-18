import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'todo-search',
  templateUrl: './todo-search.component.html',
  styleUrls: ['./todo-search.component.css']
})
export class TodoSearchComponent implements OnInit {

  searchCriteria : string;

  @Output()
  searchChangedEvent : EventEmitter<string> = new EventEmitter<string>();
  
  constructor() { }

  ngOnInit() {
  }

  clear(input){
    this.searchCriteria="";
    this.searchChangedEvent.emit(this.searchCriteria);
  }

  search(){
     this.searchChangedEvent.emit(this.searchCriteria);  
  }

}

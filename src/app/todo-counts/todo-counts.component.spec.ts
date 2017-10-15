import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCountsComponent } from './todo-counts.component';

describe('TodoCountsComponent', () => {
  let component: TodoCountsComponent;
  let fixture: ComponentFixture<TodoCountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoCountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoCountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

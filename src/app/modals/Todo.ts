export class Todo {

  constructor(private descr: string, private done: boolean, private show: boolean, categoryId: number) {
    this.Description = descr;
    this.Completed = done;
    this.Show = show;
    this.CategoryId = categoryId;
  }

  Description: string;
  Completed: boolean;
  Show: boolean;
  Id: string;
  CategoryId: number = 1;
}

export class Category {
  Id: number;
  Description: string;
  Count: number;
}
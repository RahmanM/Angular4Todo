export class Todo{

    constructor(private descr: string, private done: boolean, private show:boolean) {
       this.Description = descr;
       this.Completed = done;
       this.Show = show;
    }

    Description : string;
    Completed: boolean;
    Show:boolean;
    Id : string;
}
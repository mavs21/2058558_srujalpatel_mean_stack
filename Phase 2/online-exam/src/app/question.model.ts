export class Question {
    constructor( public id:number, 
                 public ques:string, 
                 public options:Array<string>, 
                 public answer:string, 
                 public selectedans:string){}
}

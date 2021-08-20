import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../quiz.service';
import { Question } from '../question.model';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  question:Array<Question>=[];

  @Output() outputFromChild: EventEmitter<any> = new EventEmitter<any>()


  constructor(public qSer:QuizService, public router:Router) { }


  ngOnInit(): void {

    this.qSer.fetchQuestions().subscribe(result=>this.question=result)
  }

  changeOptions(index:number, options:string){

    console.log(index+" - "+options)
    this.question[index].selectedans=options;

  }

  onSub(){
    this.qSer.storeRes(this.question)
    sessionStorage.removeItem("token");
    this.router.navigate(["result"]);
  }

}

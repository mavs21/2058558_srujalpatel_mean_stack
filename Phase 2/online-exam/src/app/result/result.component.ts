import { TestAuth } from './../TestAuth';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Question } from '../question.model';
import { QuizService } from '../quiz.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  questionsFromChild:Array<Question> = [];
  correct:number = 0;
  total:number = 0;
  result:string = "";
  
  

  constructor(public qSer:QuizService, public router:Router) { }

  ngOnInit(): void {
    this.questionsFromChild = this.qSer.result;
    this.getScore();

  }

  getScore(){

    this.total = this.questionsFromChild.length

    for(let i=0; i< this.total; i++){

      if(this.questionsFromChild[i].selectedans == this.questionsFromChild[i].answer){
        this.correct++;
      }
    }
     if(this.correct >= 7){

      this.result = "Pass"
      
      }
     
      else{
      
        this.result = "Fail"
      
      }

}

onlogout(){
  this.router.navigate(['\start']);
}


}

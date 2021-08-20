import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Question } from './question.model';
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  public result:Array<Question>=[];

  constructor(public http:HttpClient) { }

  fetchQuestions():Observable<Question[]>{
    
    return this.http.get<Question[]>("/assets/question.json");


  }

  storeRes(sol:Array<Question>){

    this.result=sol;

  }

}

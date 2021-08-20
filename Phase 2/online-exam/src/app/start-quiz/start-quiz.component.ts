import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-start-quiz',
  templateUrl: './start-quiz.component.html',
  styleUrls: ['./start-quiz.component.css']
})
export class StartQuizComponent implements OnInit {

  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  startQuiz(){
    sessionStorage.setItem("token","123")
    this.router.navigate(["quiz"]);
  }


}

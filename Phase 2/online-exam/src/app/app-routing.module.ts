import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { ResultComponent } from './result/result.component';
import { TestAuth } from './TestAuth';

const routes: Routes = [

  {path:"\start", component:StartQuizComponent},
  
  {path:"result", component:ResultComponent},

  {path:"\quiz", component:QuizComponent, canActivate:[TestAuth]},

  {path:"", redirectTo:"\start",pathMatch:"full"}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[TestAuth]
})
export class AppRoutingModule { }

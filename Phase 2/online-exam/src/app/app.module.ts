import { QuizService } from './quiz.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import{HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { StartQuizComponent } from './start-quiz/start-quiz.component';
import { QuizComponent } from './quiz/quiz.component';
import {MatCardModule} from '@angular/material/card';
import { ResultComponent } from './result/result.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    AppComponent,
    StartQuizComponent,
    QuizComponent,
    ResultComponent
  ],
  imports: [
    MatRadioModule,
    MatDividerModule,
    MatCardModule,
    MatButtonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [QuizService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

export interface Task{

  id:string;
  name:string;
  task:string;
  deadline:Date;

}

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.css']
})
export class TrackerComponent implements OnInit {

dataCap:Task[]=[];

  constructor() { }

  ngOnInit(): void {
  }


  storeTask(empRef:NgForm): void{

    let Task = empRef.value;

    let mulTask = {
      id:Task.id,
      name:Task.name,
      task:Task.task,
      deadline:Task.deadline
    };

    this.dataCap.push(mulTask);
    empRef.reset();

  }



}


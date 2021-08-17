import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  rFlag:boolean = false;

  lFlag:boolean = true;

  pFlag:boolean = false;

  cFlag:boolean = false;



  presentusername:string = "" ;

  userId:number = 0;

  members:{ id:number, firstname:string, lastname:string, username:string, password:string } [] = [];


contacts:{id:number, name:string, num:string}[] = [];

  constructor() { }

  ngOnInit(): void {

  }

  ckUser(loginRef:NgForm) : void {

  let loginInfo = loginRef.value;

    for (let mem of this.members) {

      if (loginInfo.user == mem.username) {


        if (loginInfo.pass == mem.password) {

          this.presentusername = mem.username;
          

          this.toPort();

          return;

        }

        else {
          return;
        }
      }
    }

    alert("Username or Password is Incorrect");

    loginRef.reset();
  }

  addCont(contactRef:NgForm) : void {

    let contactInfo = contactRef.value;

    let contact = {
      
      id:this.userId, 
      name:contactInfo.contactname, 
      num:contactInfo.phone
    
    };

    this.contacts.push(contact);
    this.dispContact();
  }


  dispContact() : void {

    let dataTable = document.getElementById("contact_list") as HTMLElement;
    let disp:string = "";
    let there:boolean = false;

    for (let contact of this.contacts) {

    
      if (contact.id == this.userId) {

        if (!there) {
          disp += "<label class=\"label2 \">Contact Details</label><table border=3% class=\"table \"><tr><th>Contact Name</th><th>Phone Number</th></tr>";

          there = true;
        }

        disp += "<tr><td>" + contact.name + "</td><td>" + contact.num + "</td></tr>";
      }
    }

    if (!there) {

      dataTable.innerHTML = "<h5>There are no contacts in the system</h5>"
    
    }

    else {

      dataTable.innerHTML = disp + "</table>";

    }
  }


  addUser(registerRef:NgForm) : void {

    let regForm = registerRef.value;

    for (let acc of this.members) {

      if (regForm.user == acc.username) {

        alert("The Username is already in our system.");

        return;
      }
    }
  
    let preAcc = { 

      id:this.members.length, 
      username:regForm.user, 
      firstname:regForm.fname, 
      lastname:regForm.lname, 
      password:regForm.pass
   
    };

    this.members.push(preAcc);

    alert("Congratulations Your Account is successfully created");

    this.toLoginPage();

  }

  toRegPage() : void {

    this.lFlag = false;

    this.rFlag = true;

    this.pFlag = false;

    this.cFlag = false;
  }

  toLoginPage() : void {

    this.lFlag = true;

    this.rFlag = false;

    this.pFlag = false;

    this.cFlag = false;
  }

  toPort() : void {

    this.lFlag = false;

    this.rFlag = false;

    this.pFlag = true;

    this.cFlag = true;

    this.dispContact();
  }

}



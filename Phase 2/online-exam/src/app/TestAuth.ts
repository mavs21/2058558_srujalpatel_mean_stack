import { Injectable } from "@angular/core"
import { CanActivate, Router } from "@angular/router"
import { HttpClientModule } from '@angular/common/http'; 

@Injectable()
export class TestAuth implements CanActivate{
    constructor(public router:Router){}
    canActivate(){
        let obj = sessionStorage.getItem("token");
        if(obj!= null){
            return true;
        }
        else{
            this.router.navigate(["start"])
            return false;
        }
    }
}
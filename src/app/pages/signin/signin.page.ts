import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.page.html',
  styleUrls: ['./signin.page.scss'],
})
export class SigninPage implements OnInit {
loginGroup:FormGroup;
  constructor(private chat:ChatService,private router:Router) { }

  ngOnInit() {
    if(this.chat.getMyDetails()!='undefined'||this.chat.getMyDetails()!='')
    {
      this.router.navigate(['chat/messages'])
    }
    this.loginGroup=new FormGroup({
      email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password:new FormControl('',Validators.compose([Validators.required]))
    })
  }
tryLogin(){
  this.chat.checkUserLogin(this.loginGroup).subscribe(response=>{
    if(response.email && response.password){
      this.chat.setMyDetails(this.loginGroup.get('email').value)
     this.router.navigate(['chat/messages'])
    }
  })
}
goToRegister(){
  this.router.navigate(['register'])
}
}

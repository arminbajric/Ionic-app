import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ChatService } from '../../service/chat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
registerGroup:FormGroup;
message:any;
  constructor(private chat:ChatService,private router:Router) { }

  ngOnInit() {
    this.registerGroup=new FormGroup({
      email:new FormControl('',Validators.compose([Validators.required,Validators.email])),
      password:new FormControl('',Validators.compose([Validators.required])),
      username:new FormControl('',Validators.required),
      repassword:new FormControl('',Validators.required)
    })
  }
  saveUser(){
    this.message=''
    this.chat.saveUser(this.registerGroup).subscribe(response=>{
      if(response==201)
      {
        this.router.navigate(['signin']);
      }
      else{
        this.message='Email is in use.Sign in.'
      }
    })
  }
  goToLogin(){
    this.router.navigate(['signin']);
  }
  }



import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
users=[];
me:any;
message:any;
loaded:boolean;
  constructor(private chat:ChatService) { }

  ngOnInit() {
   this.chat.getOnlineUsers().subscribe(response=>{
  this.users=response;
  })
  this.loaded=false;
  this.chat.subscribeToUsers().subscribe(response=>{
    this.users=[];
   
    this.users=response;
    for(let i=0;i<this.users.length;i++)
    {
      let temp=this.users[i];
      if(temp.userEmail==this.chat.getMyDetails())
      {
        this.users.splice(i, 1);
      }
    } setTimeout(()=>{
     
      if(this.users.length<2)
      {
       this.message='No users online'
      }
      else{
        this.message='';
      }
    },1000)
  })
  setTimeout(()=>{
    this.loaded=true;
   
  },1000)
}
}

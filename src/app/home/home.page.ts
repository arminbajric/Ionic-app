import { Component } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  users = [];
  temp:any;
  messages: any;
  online: number;
  constructor(
    private chat: ChatService
  ) {
    this.users = [];
    this.messages = [];
    this.chat.connectWS().then(value => {
      if (value) {
        this.chat.getOnlineUsers().subscribe(response => {
          this.users=[];
          this.users = response;
          console.log(this.users)
          if((this.users.length>0))
          {
          this.online = this.users.length - 1
          }
          else{
            this.online=0;
          }

        })
        this.chat.subscribeToUsers().subscribe((response:any) => {
          this.users=[];
          this.temp = JSON.parse(response);
          this.users=this.temp.body;
          console.log(this.users.length);
          if((this.users.length>0))
          {
          this.online = this.users.length - 1
          }
          else{
            this.online=0;
          }


        });


      }
    })
  }
}

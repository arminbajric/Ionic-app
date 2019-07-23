import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {
messages=[];
  constructor(private chat:ChatService,private cookie:CookieService) { }

  ngOnInit() {
    this.chat.getUsersConversation(this.chat.getMyDetails()).subscribe(response=>{
     this.messages=response;
     console.log(this.messages)
    })
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-cwindow',
  templateUrl: './cwindow.page.html',
  styleUrls: ['./cwindow.page.scss'],
})
export class CwindowPage implements OnInit {
  @Input() room: string;
  @Input() buddy: string;
  messages=[];
  chatGroup: FormGroup;
  temp:any;
  me:any;
  constructor(private chat: ChatService) { }

  ngOnInit() {
    this.me=this.chat.getMyDetails();
    this.chatGroup = new FormGroup({
      messages: new FormControl('', Validators.required)
    })
    this.chat.getRoomMessages(this.room).subscribe(response => {
      this.messages = response;
    })
    this.chat.subscribeToRoom(this.room).subscribe((response:any) => {
      this.messages=[];
      console.log(response.body);
      this.temp = JSON.parse(response);
      this.messages=this.temp.body;
    })
    console.log(this.me)
  }
  sendMessage() {
    
      this.chat.sendMessageToRoom(this.room, this.chatGroup.get('messages').value)
    
  }
}

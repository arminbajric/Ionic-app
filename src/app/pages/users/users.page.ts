import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../service/chat.service';
import { ModalController } from '@ionic/angular';
import { CwindowPage } from '../cwindow/cwindow.page';


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
temp:any;
  constructor(private chat:ChatService,private modalController: ModalController) { }

  ngOnInit() {
   this.chat.getOnlineUsers().subscribe(response=>{
  this.users=response;
  for(let i=0;i<this.users.length;i++)
  {
    let temp=this.users[i];
    if(this.chat.getMyDetails().match(temp.userEmail))
    {
      this.users.splice(i, 1);
    }
  }
  })
  this.loaded=false;
  this.chat.subscribeToUsers().subscribe((response:any)=>{
    this.users=[];
    this.temp = JSON.parse(response);
    this.users=this.temp.body;
    for(let i=0;i<this.users.length;i++)
    {
      let temp=this.users[i];
      if(this.chat.getMyDetails().match(temp.userEmail))
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
async openChatWindow(event) {
  let user = (event.target as Element).id;
  let name=(event.target as Element).textContent;
  let room;
  
  await this.chat.generateConversationRoom(user,this.chat.getMyDetails()).then(value=>{
        room=value;
      
  })
  const modal = await this.modalController.create({
    component: CwindowPage,
    componentProps:{
      'room':room,
      'buddy':name
    }
  });
  return await modal.present();
}
}

import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { HttpParams, HttpClient } from '@angular/common/http';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { CookieService } from 'ngx-cookie-service';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ChatService {


  constructor(private http: HttpClient, private cookie: CookieService) { }

  connectionActive: boolean;
  stompClient: Stomp;
  messages = [];
  users = [];
  environment = {
    devHost: 'http://localhost:3001'
  }
  connectWS(): Promise<boolean> {
    var socket = new SockJS(this.environment.devHost + '/ws');
    this.stompClient = Stomp.over(socket);
    let that = this;
    return new Promise(resolve => (this.stompClient.connect({ email: this.cookie.get('mychat-user') }, function (frame) {
      that.setConnectionState(true);
      that.stompClient.send('/app/newUsers', {}, JSON.stringify({ 'author': that.cookie.get('mychat-user') }))

      resolve(true);

    }, function (error) {
      setTimeout(function () { that.connectWS() }, 1000);
      that.setConnectionState(false);
      resolve(false);
    })
    ))


  }
  sendMessageToRoom(room, text) {
    this.stompClient.send('/app/newMessage/' + room, {}, JSON.stringify({ 'author': this.cookie.get('mychat-user'), 'text': text, 'room': room }))
  }
  subscribeToRoom(room): Observable<string[]> {
    let subject = new Subject<any>();
    this.stompClient.subscribe('/topic/newMessage/' + room, function (message) {
      subject.next((message.body))

    });

    return subject.asObservable();
  }
  subscribeToUsers(): Observable<any> {

    let subject = new Subject<any>();
    this.stompClient.subscribe('/topic/users', function (message) {

      subject.next(((message.body)))
    });
    return subject.asObservable();
  }

  refreshMessages(messages) {
    this.messages = messages;

  }
  refreshUsers(users) {
    this.users = users;

  }
  getMessages(): Observable<any> {

    return this.http.get(this.environment.devHost + '/messages/Public', { observe: 'response' }).pipe(map(response => {
      if (response.body) {
        return response.body;
      }
    }));

  }
  getRoomMessages(room): Observable<any> {

    return this.http.get(this.environment.devHost + '/room-messages', { params: new HttpParams().set('users', room), observe: 'response' }).pipe(map(response => {
      if (response.body) {
        return response.body;
      }
    }));

  }

  setConnectionState(state: boolean) {
    this.connectionActive = state;
  }

  connectionListener(): boolean {
    return this.connectionActive;
  }
  getUsersConversation(user, buddy): Observable<any> {

    return this.http.get(this.environment.devHost + '/conversation', { params: new HttpParams().set('user', user).set('type', buddy), observe: 'response' }).pipe(map((response:any) => {
      return response.body;
    }))
  }
  checkUserLogin(form: FormGroup): Observable<any> {

    return this.http.post(this.environment.devHost + '/user-management/login', { 'email': form.get('email').value, 'password': form.get('password').value }, { observe: 'response' }).pipe(map(response => {
      return response.body;
    }))
  }
  checkIfEmailExists(email: string): Promise<boolean> {

    return new Promise((resolve) => (this.http.get(environment.devHost + '/user-management/check-unique', { params: new HttpParams().set('email', email), observe: 'response' }).subscribe((response: any) => {

      if (response.body.unique) {
        resolve(true)

      }
      else {
        resolve(false)
      }
    })))

  }
  saveUser(form: FormGroup): Observable<number> {
    let data = {
      username: form.get('username').value,
      email: form.get('email').value,
      password: form.get('password').value
    }
    return this.http.post(this.environment.devHost + '/user-management/new', data, { observe: 'response' }).pipe(map(response => {
      return response.status;
    }))
  }
  generateConversationRoom(buddy, user): Promise<string> {
    let list = [
       {
        'email': buddy
      },
      { 'email': user }


    ]
    return new Promise(resolve => (this.http.post(environment.devHost + '/room', list, { observe: 'response' }).subscribe((response: any) => {
     
      resolve(response.body.name);
    })))

  }
  getOnlineUsers(): Observable<any> {

    return this.http.get(environment.devHost + '/users', { observe: 'response' }).pipe(map(response => {
      return response.body;
    }))
  }
  sendPublic(text) {
    this.stompClient.send('/app/newMessage/Public', {}, JSON.stringify({ 'author': this.cookie.get('mychat-user'), 'text': text, 'room': 'Public' }))
  }
  getMyDetails() {
    return this.cookie.get('mychat-user')
  }
  setMyDetails(user) {
    this.cookie.set('mychat-user', user)
  }
}

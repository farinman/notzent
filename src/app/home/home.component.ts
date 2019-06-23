import { Component, OnInit } from '@angular/core';
import { AuthService, userData } from '../auth/auth.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { reject } from 'q';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  postData: {};
  user: firebase.User;
  userData: any;
  allUsers: any;

  readonly ROOT_URL = 'http://localhost:8080/rest/process-definition/key/redcross/start';
  constructor(private auth: AuthService,
    private router: Router,
    private firestore: AngularFirestore,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;

        this.getUserData(this.user.uid);

      })
    //this.auth.getUserData(this.user.uid).subscribe(data => console.log(data));
    //console.log(this.userData);
      this.getAllUser();


  }
  //führt zu der Login-Seite
  login() {
    this.router.navigate(['/login']);
  }

  //Loggt den Benutzer aus
  logout() {
    this.auth.logout();
  }

  //erhält die Benutzerdaten
  getUserData(userUid: string) {
    this.auth.getUserData(this.user.uid).subscribe(data => {
      this.userData = data; if (this.userData.role != "nzma") { this.logout(); }
    });
  }

  //ermittelt alle verifizierten Kunden
  getAllUser() {

    this.firestore.collection("Users", ref => ref.where("checked", "==", true)).snapshotChanges().subscribe(res =>(this.allUsers = res));

  }



}

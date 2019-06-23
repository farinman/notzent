import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { UserDataService } from './shared/user-data.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],

})
export class AppComponent {
  UserData: Observable<any[]>;

  constructor(db: AngularFireDatabase) { 
    this.UserData = db.list('Users').valueChanges();
    console.log(this.UserData);
  }
}
import { Injectable } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { AppUser } from './models/app-user';
import 'rxjs/add/operator/switchMap';
import * as firebase from 'firebase';


@Injectable()
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User){
    this.db.object('/user/'+ user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  get(uid: string): FirebaseObjectObservable<AppUser> {
    return this.db.object('/user/'+ uid)
  }
}

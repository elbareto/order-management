import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Ordine } from '../shared/Ordine';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  ordiniFireList: AngularFireList<Ordine>;
  ordini: Set<Number>;

  constructor(private db: AngularFireDatabase) {
    this.ordiniFireList = this.db.list('/ordini');
  }

  getOrdini() {
    return this.ordiniFireList;
  }

  saveOrdine(ordine: Ordine) {
      this.ordiniFireList.push(ordine);
  }

  deleteOrdine(key: string) {
    this.ordiniFireList.remove(key);
  }
}

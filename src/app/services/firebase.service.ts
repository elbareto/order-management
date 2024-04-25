import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Ordine } from '../shared/Ordine';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  ordiniSingle: AngularFireList<Ordine>;
  ordiniDouble: AngularFireList<Ordine>;
  
  ordini: Set<Number>;

  constructor(private db: AngularFireDatabase) {
    this.ordiniSingle = this.db.list('/ordini-single');
    this.ordiniDouble = this.db.list('/ordini-double')
  }

  getOrdiniSingle() {
    return this.ordiniSingle;
  }

  saveOrdineSingle(ordine: Ordine) {
      this.ordiniSingle.push(ordine);
  }

  deleteOrdineSingle(key: string) {
    this.ordiniSingle.remove(key);
  }


  getOrdiniDouble() {
    return this.ordiniDouble;
  }

  insertOrdineDouble(ordine: Ordine) {
    this.ordiniDouble.push(ordine);
  }
  updateOrdineDouble(ordine: Ordine) {
    this.ordiniDouble.update(ordine.key, ordine);
  }
  deleteOrdineDouble(key: string) {
    this.ordiniDouble.remove(key);
  }
}

import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Ordine } from 'src/app/shared/Ordine';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  ordini: Ordine[];
  ordineDaInserire: any = '';

  constructor(private firebase: FirebaseService) {}

  ngOnInit() {
    let ordiniFireList = this.firebase.getOrdini();
    ordiniFireList.snapshotChanges().subscribe(data => {
      this.ordini = [];
      data.forEach(item => {
        let ordine = item.payload.toJSON() as Ordine;
        ordine.key = String(item.key);
        this.ordini.push(ordine);
      })
      this.ordini.sort((a,b) => a.key > b.key ? -1 : 1);
    })
    // console.log(this.ordini);
  }

  inserisciOrdine() {
    this.ordineDaInserire = Number(this.ordineDaInserire);

    // Se l'ordine è già presente, lo elimino
    for (let ordine of this.ordini) {
      if (this.ordineDaInserire == ordine.numeroOrdine) {
        this.firebase.deleteOrdine(ordine.key);
        this.ordineDaInserire = '';
        return; // Termino l'operazione
      }
    }

    let ordine = new Ordine(this.ordineDaInserire);
    this.firebase.saveOrdine(ordine);

    this.ordineDaInserire = '';
  }

  cancellaOrdine(ordine: Ordine) {
      this.firebase.deleteOrdine(ordine.key);
  }

  appendDigit(digit: string) {
    this.ordineDaInserire += digit;
  }

  removeLastDigit() {
    this.ordineDaInserire = this.ordineDaInserire.substring(0, this.ordineDaInserire.length-1);
  }

  clearScore() {
    this.ordineDaInserire = '';
  }
}

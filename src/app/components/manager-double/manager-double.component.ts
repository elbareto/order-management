import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Ordine } from 'src/app/shared/Ordine';
import { StatoOrdine } from 'src/app/shared/StatoOrdine';

@Component({
  selector: 'app-manager-double',
  templateUrl: './manager-double.component.html',
  styleUrls: ['./manager-double.component.css']
})
export class ManagerDoubleComponent {

  ordiniInPreparazione: Ordine[];
  ordiniDaRitirare: Ordine[];

  ordineDaInserire: any = '';

  constructor(private firebase: FirebaseService) {}

  ngOnInit() {

    let ordiniFireList = this.firebase.getOrdiniDouble();
    ordiniFireList.snapshotChanges().subscribe(data => {
      this.ordiniInPreparazione = [];
      this.ordiniDaRitirare = [];
      data.forEach(item => {
        let ordine = item.payload.toJSON() as Ordine;
        ordine.key = String(item.key);

        if (ordine.stato == StatoOrdine.QUEUE) {
          this.ordiniInPreparazione.push(ordine);

        } else if (ordine.stato == StatoOrdine.READY) {
          this.ordiniDaRitirare.push(ordine);
        }

      })
      this.ordiniInPreparazione.sort((a,b) => a.lastUpdate > b.lastUpdate ? -1 : 1);
      this.ordiniDaRitirare.sort((a,b) => a.lastUpdate > b.lastUpdate ? -1 : 1);
    })
  }

  inserisciOrdine() {
    this.ordineDaInserire = Number(this.ordineDaInserire);

    // Se l'ordine è già presente, lo elimino
    for (let ordine of this.ordiniInPreparazione) {
      if (this.ordineDaInserire == ordine.numeroOrdine) {
        this.ordineDaInserire = '';
        this.segnaOrdinePronto(ordine);
        return; // Termino l'operazione
      }
    }
    for (let ordine of this.ordiniDaRitirare) {
      if (this.ordineDaInserire == ordine.numeroOrdine) {
        this.ordineDaInserire = '';
        this.firebase.deleteOrdineDouble(ordine.key);
        return; // Termino l'operazione
      }
    }

    let ordine = new Ordine(this.ordineDaInserire, StatoOrdine.QUEUE);
    this.firebase.insertOrdineDouble(ordine);

    this.ordineDaInserire = '';
  }

  segnaOrdinePronto(ordine: Ordine) {
    // ordine.segnaPronto();
    ordine.stato = StatoOrdine.READY;
    ordine.lastUpdate = new Date().toISOString();
    this.firebase.updateOrdineDouble(ordine);
  }
  segnaOrdineRitirato(ordine: Ordine) {
    this.firebase.deleteOrdineDouble(ordine.key);
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


  getSectionSizeClass() {
    let maxSize = Math.max(this.ordiniInPreparazione.length, this.ordiniDaRitirare.length);

    let sectionClass = "";
    if (maxSize > 9 && maxSize <= 12) {
      sectionClass = "medium";

    } else if (maxSize > 12)  {
      sectionClass = "large";
    }

    return sectionClass;
  }
}

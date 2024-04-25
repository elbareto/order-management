import { Component } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Ordine } from 'src/app/shared/Ordine';
import { StatoOrdine } from 'src/app/shared/StatoOrdine';

@Component({
  selector: 'app-display-double',
  templateUrl: './display-double.component.html',
  styleUrls: ['./display-double.component.css']
})
export class DisplayDoubleComponent {
  
  ordiniInPreparazione: Ordine[];
  ordiniDaRitirare: Ordine[];

  constructor(private firebase: FirebaseService) { }

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
        
        } else {
          this.ordiniDaRitirare.push(ordine);
        }

      })
      this.ordiniInPreparazione.sort((a,b) => a.lastUpdate > b.lastUpdate ? -1 : 1);
      this.ordiniDaRitirare.sort((a,b) => a.lastUpdate > b.lastUpdate ? -1 : 1);
    })
  }

  getSectionSizeClass() {
    let maxSize = Math.max(this.ordiniInPreparazione.length, this.ordiniDaRitirare.length);

    let sectionClass = "";
    if (maxSize > 3 && maxSize <= 8) {
      sectionClass = "medium";
    
    } else if (maxSize > 8)  {
      sectionClass = "large";

    }

    return sectionClass;
  }

  areThereOrders() {
    return this.ordiniInPreparazione.length > 0 || this.ordiniDaRitirare.length > 0;
  }
}

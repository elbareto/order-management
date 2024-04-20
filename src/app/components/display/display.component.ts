import { Component, OnInit } from '@angular/core';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Ordine } from 'src/app/shared/Ordine';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  ordini: Ordine[];

  constructor(private firebase: FirebaseService) { }

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
}

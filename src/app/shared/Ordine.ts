import { StatoOrdine } from "./StatoOrdine";

export class Ordine {
  key: string;
  numeroOrdine: number;
  stato: StatoOrdine;
  lastUpdate: string;

  constructor(
    numeroOrdine: number,
    stato: StatoOrdine
  ) {
    let now = new Date();

    this.key = now.toISOString();
    this.numeroOrdine = numeroOrdine;
    this.stato = stato;
    this.lastUpdate = now.toISOString();
  }

  public segnaPronto(): void {
    this.stato = StatoOrdine.READY;
    this.lastUpdate = new Date().toISOString();
  }
}

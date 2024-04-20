export class Ordine {
  key: string;
  numeroOrdine: number;

  constructor(numeroOrdine: number) {
    let now = new Date();

    this.key = now.toISOString();
    this.numeroOrdine = numeroOrdine;
  }
}

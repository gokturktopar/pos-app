
export class Payment {
  currency: string
    amount: number
    time: Date
    status: number
    qrCode: string
  constructor() {
    this.currency = null
    this.amount = null
    this.time = null
    this.status = null
  }
};


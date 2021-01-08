import { Component, OnInit,Input } from '@angular/core';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import {  PaymentService} from '@app/services/payment.service';
import {Payment} from '../models/payment';
import { SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  providers: [MessageService],
})
export class PanelComponent implements OnInit {
  @Input() changed:boolean
  @Input() customerId:string

  loadingPage: boolean = false;
  loadingPost: boolean = false;
  payments: Payment[] = null
  constructor(
    private messageService: MessageService,
    private paymentService: PaymentService,


  ) { }

  ngOnInit(): void {
    console.log(this.loadingPage);
  }
  ngOnChanges(changes: SimpleChanges) {
          this.getAll();
    
}
  getAll() {
    this.loadingPage = true;
    this.paymentService.getPayments(this.customerId).pipe(finalize(() => { this.loadingPage = false })).subscribe(data => {
     this.payments= data;
     this.changed=false
    },err => {
      this.errorMessage(err)
    }
    )
  }

  completePayment(qrCode:string) {
    this.loadingPost = true;
    const data = {qrData:qrCode}
    this.paymentService.completePayment(data).pipe(finalize(() => { this.loadingPost = false })).subscribe(data => {
     this.getAll();
    },err => {
      this.errorMessage(err)
    }
    )
  }

  errorMessage(detail : string) {
    this.messageService.add(
      { severity: 'error', summary: 'Error Message', detail: detail }
    );
  } 
}

import {  PosService} from '@app/services/pos.service';
import { CustomerService } from '@app/services/customer.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import  {QRCode} from '@app/models/qrCode'
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-pos',
  templateUrl: './pos.component.html',
  styleUrls: ['./pos.component.scss'],
  providers: [MessageService],

})
export class PosComponent implements OnInit {
  @Output() output = new EventEmitter();
  loadingPage: boolean = false;
  totalAmount :number = null
  postForm: FormGroup;
  createModal: boolean = false
  qrCode : QRCode = null
  customerId: string = null
  constructor(private customerService: CustomerService,
    private fb: FormBuilder,
    private messageService: MessageService,
    private posService: PosService, ) {
      this.postForm = this.fb.group({
        totalAmount: new FormControl(null, [Validators.required]),
      });
     }

  ngOnInit(): void {
    this.generateCustomerId();
  }
  generateCustomerId() {
    this.customerService.generateCustomerId().pipe().subscribe(data => {
      this.customerId = data.id;
      const emitData = {type :0, customerId: this.customerId}
      this.output.emit(emitData);
    },err => {
      this.errorMessage(err)
    })
  }
  generateQr() {
    this.loadingPage = true;
    const data = {totalReceiptAmount: this.totalAmount, customerId: this.customerId}
    this.posService.generateQrCode(data).pipe(finalize(() => { this.createModal = false, this.loadingPage = false })).subscribe(data => {
     this.qrCode= data;
     this.totalAmount = null;
     const emitData = {type :1}

     this.output.emit(emitData);

    },err => {
      this.errorMessage(err)
    }
    )
  }
  dialogClosed(){
    this.createModal = false;
  }
  errorMessage(detail : string) {
    this.messageService.add(
      { severity: 'error', summary: 'Error Message', detail: detail }
    );
  } 
}

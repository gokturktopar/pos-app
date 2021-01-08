import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],

})
export class HomeComponent implements OnInit {
  isLoading = false;
  customerId: string
  panelChanged:number = 0
  constructor(
  ) { }

  ngOnInit() {
  }
  getOutputFromPos(data: any){
    if (data.type == 0) { //emit customer id
      this.customerId = data.customerId
      
    } else if(data.type == 1){ //emit create qr
      this.panelChanged ++
    }
  }
}

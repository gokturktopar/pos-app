import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { QRCode } from '../models/qrCode';
import { HttpHeaderService } from './http-header.service';

@Injectable({
  providedIn: 'root'
})
export class PosService extends HttpHeaderService {
  constructor(
    private http: HttpClient,
    ) { super() }
  public generateQrCode(body: any): Observable<QRCode> {
    const endpoint = '/api/pos/generate-qr-code'
    return this.http.post<QRCode>(endpoint,body, this.getHeader())
      .pipe(catchError(err => this.handleError(err)))
  }// ---------------------------------------------------------------------

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      if (error.status === 400) {
        if (error.error.validationErrors) {
          error.error.validationErrors.forEach((val: { message: string; }, index: any) => {
          });
        }
      }
       else if (error.status === 500) {
      }
      else if (error.status === 422) {
         return throwError(error.error.message);

      }
    }
    return throwError(error.error.message);
  }

}

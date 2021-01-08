import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaderService } from './http-header.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService extends HttpHeaderService {
  constructor(
    private http: HttpClient,
    ) { super() }
  public generateCustomerId(): Observable<any> {
    const endpoint = '/api/customers/generate-customer-id'
    return this.http.get<any>(endpoint, this.getHeader())
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

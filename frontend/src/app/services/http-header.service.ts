import { HttpHeaders } from '@angular/common/http';

export abstract class HttpHeaderService {

  constructor() { }

  protected getHeader(): { headers: HttpHeaders } {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    return options;
  }
}

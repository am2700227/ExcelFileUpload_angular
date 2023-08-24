import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http:HttpClient) { }


  getData() : Observable<any> {
    return this.http
      .get(environment.geturl, { observe: 'response', responseType: 'text' });
  }

  uploadFile(formData : FormData): Observable<any>{
    return this.http.post(environment.apiUrl, formData);
  }
}

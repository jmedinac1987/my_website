import { Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url_base: string;

  constructor(private http: HttpClient) {
  	this.url_base = 'http://localhost:3000/api/sendEmail';
  }

  sendEmailWebsite(form){
  	return this.http.post(`${this.url_base}/send`,form);
  }
}

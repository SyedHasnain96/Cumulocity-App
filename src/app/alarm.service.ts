import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {

  baseUrl = 'https://excercise2.latest.stage.c8y.io'
  constructor(private http: HttpClient) { }
 
  getAlarmCollection(queryString: string){

    let header = new HttpHeaders();
    header = header.set('Content-Type', 'application/json; charset=utf-8');
    header = header.set('Authorization' , 'Basic dDI5OTI5Ni9uZXh0OmVtcGxveWVl')
    return this.http.get(this.baseUrl + `/alarm/alarms?${queryString}
    `,{headers: header});
  }
}

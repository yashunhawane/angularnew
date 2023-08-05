import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  apiURLPAth:string=environment.apiURL;
  constructor(private http: HttpClient) { }

  getArticleData(id):Observable<any>{
    // return this.http.get(
    //   `${environment.apiURL}/providerInfo?providerName`,
    // );
    //3259 for single image
    //3616 for video
    //3822 for multi image
    return this.http.post<any>(this.apiURLPAth+'/unauth',{
      nMCd:100000018,
      oRequestData:{
        nNwsCd: id
      }
    })
    .pipe(
      map((response) => {
        return response;
      })
    );
  }

  getvisitorIP(url){
    return this.http.get<any>(url)
    .pipe(
      map((response) => {
        return response;
      })
    );
  }
  storeIpAddress(ip, newsId):Observable<any>{
    //3259 for single image
    //3616 for video
    //3822 for multi image
    return this.http.post<any>(this.apiURLPAth+'/unauth',{
      "nMCd":100000022,
      "nLgCd":0,
      "nMSn":0,
      "nSId":0,
      "nCTp":0,
      "nCLt":0,
      "nIUCd":0,
      "sAVN":"0",
      "sDUId":"",
      "oRequestData":{
          "nAnCd":0,
          "nCd":newsId,
          "sMetaData":"",
          "sScrNm":"ShortNews Screen",
          "nSnSid":0,
          "nType":1, 
          "sIPAddress":ip
        }
    })
    .pipe(
      map((response) => {
        return response;
      })
    );
  } 
}

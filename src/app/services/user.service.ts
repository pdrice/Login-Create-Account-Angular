import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:any;

  constructor(private http:HttpClient) { }

  public createNewUser(dataObj:any){
    return new Promise((resolve,reject)=>{
      this.http.post('http://localhost:3000/users', dataObj)
      .subscribe((res)=>{
        resolve(res)
      }),
      (error:Error) => {
        reject(error);
      }
    })
  }

  public getUser(email:string){
      return new Promise((resolve,reject)=>{
        this.http.get('http://localhost:3000/users?email='+email)
        .subscribe((res)=>{
          resolve(res);
        }), (err:Error)=>{
          reject(err);
        }
      })
  }
}

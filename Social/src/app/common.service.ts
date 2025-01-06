import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  changePassword(username: any, newPassword: any) {
    throw new Error('Method not implemented.');
  }
   
  private apiUrl = 'http://localhost:8073/';
  socket: any;
  constructor(private http: HttpClient,private router: Router) {this.socket = io(this.apiUrl);}

  list(): Observable<string> {return this.http.get<string>(`${this.apiUrl}api/admin/loginlist`);}
  deleteData(id: number): Observable<any> {const url = `${this.apiUrl}/delete/${id}`;return this.http.delete(url);}
  updateData(data: any,id: String): Observable<any> {const url = `${this.apiUrl}api/profile/update/${id}`; return this.http.post<any>(url,data);}
  edit(id: number): Observable<any> {const url = `${this.apiUrl}/edit/${id}`;return this.http.get<any>(url);}
  saveData(data: any): Observable<any> {var url=this.apiUrl+'api/admin/save';return this.http.post<any>(url,data);}
  sendMail(id: number): Observable<any> {const url = `${this.apiUrl}/mail/${id}`; return this.http.post(url, {});}
  uploadExcel(formData: FormData): Observable<any> {return this.http.post<any>(`${this.apiUrl}/upload`, formData);}
  downloadExcel(): Observable<Blob> {return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });}
  getLastUser():Observable<any> {const url = `${this.apiUrl}api/admin/lastuser`;return this.http.get<any>(url);}
  admindata():Observable<string> {return this.http.get<string>(`${this.apiUrl}api/admin/adminlist`);}
  getempdata(): Observable<string> {return this.http.get<string>(`${this.apiUrl}api/admin/emplistdata`);}
  getLoginData(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/dashboard/getlogindata`); }
  login(username: string, password: string): Observable<any> {const data = { username, password };return this.http.post(`${this.apiUrl}auth/login`, { username, password });}
  view(id: String): Observable<any> {const url = `${this.apiUrl}api/profile/view/${id}`;return this.http.get<any>(url);}
  ocruploadinvoice(formData:FormData):Observable<any> {return this.http.post<any>(`${this.apiUrl}api/ocr/PDFofPo`, formData);}
  ocruploadpo(formData:FormData):Observable<any> {return this.http.post<any>(`${this.apiUrl}api/ocr/PDFofAgree`, formData);}
  ocruploadcompare(detailTable: any[], aggreDetail: any[]): Observable<any> {const requestBody = {detailTable: detailTable,aggreDetail: aggreDetail};return this.http.post<any>(`${this.apiUrl}api/ocr/compare`, requestBody);}
  sendMessage(message: string) {this.socket.emit('chat_message', message);}
  receiveMessages(): Observable<string> {return new Observable<string>((observer) => {this.socket.on('chat_message', (message: string) => {observer.next(message);});});}
  sendmail(data:any): Observable<any> {var url=this.apiUrl+'api/email/send';return this.http.post<any>(url,data);}
  newReg(data: any): Observable<any> {var url=this.apiUrl+'api/register/save';return this.http.post<any>(url,data);}
  changepass(data: any): Observable<any> {var url=this.apiUrl+'api/register/passchange';return this.http.post<any>(url,data);}
}

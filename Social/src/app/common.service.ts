import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

export interface Notification {
  id: number;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class CommonService {
   
  private apiUrl = 'http://localhost:8073/';
  constructor(private http: HttpClient,private router: Router) {}

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
 // sendMessage(message: string) {this.socket.emit('chat_message', message);}
  sendmail(data:any): Observable<any> {var url=this.apiUrl+'api/email/send';return this.http.post<any>(url,data);}
  newReg(data: any): Observable<any> {var url=this.apiUrl+'api/register/save';return this.http.post<any>(url,data);}
  changepass(data: any): Observable<any> {var url=this.apiUrl+'api/register/passchange';return this.http.post<any>(url,data);}
  sendMessage(message: any):Observable<any> {var url=this.apiUrl+'api/messages/save';return this.http.post<any>(url,message);}
  //getChatHistory(details:any): Observable<any> {var url=this.apiUrl+'api/messages/chat';return this.http.get<any>(url,details);}
  getChatHistory(message: any):Observable<any> {var url=this.apiUrl+'api/messages/retrive';return this.http.post<any>(url,message);}
  getChatperson():Observable<any> {var url=this.apiUrl+'api/messages/getpersonList';return this.http.get<any>(url);}
  getChatHistorybyId(message: any):Observable<any> {var url=this.apiUrl+'api/messages/retrivebyid';return this.http.post<any>(url,message);}
  getChatData(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/dashboard/getChatData`); }
  formdetails(usrid:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/admin/formdetails/${usrid}`); }
  saveuserrightData(data: any): Observable<any> {const url = `${this.apiUrl}api/admin/saverights`; return this.http.post<any>(url,data);}
  userList(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/admin/userList`); }
  useredit(userid: any): Observable<any> {const url = `${this.apiUrl}api/admin/userrightsedit/${userid}`;return this.http.get<any>(url);}
  userDelete(userid: any): Observable<any> {const url = `${this.apiUrl}api/admin/userrightsdelete/${userid}`;return this.http.delete(url);}
  getcheckcomment(userid: any):Observable<any> {const url = `${this.apiUrl}api/admin/checkcomment/${userid}`;return this.http.get<any>(url);}
  formList(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/admin/formList`); }
  saveformData(data: any): Observable<any> {const url = `${this.apiUrl}api/admin/saveform`; return this.http.post<any>(url,data);}
  formedit(formid: any): Observable<any> {const url = `${this.apiUrl}api/admin/editform/${formid}`;return this.http.get<any>(url);}
  updateformData(data: any): Observable<any> {const url = `${this.apiUrl}api/admin/updateform`; return this.http.post<any>(url,data);}
  formDelete(formid: any): Observable<any> {const url = `${this.apiUrl}api/admin/deleteform/${formid}`;return this.http.delete(url);}
  getUnreadNotifications(): Observable<Notification[]> { return this.http.get<Notification[]>(`${this.apiUrl}api/notification/unread`);}
  markAsRead(id: number): Observable<void> {return this.http.put<void>(`${this.apiUrl}api/notification/markAsRead/${id}`, {}); }
  createNotification(notification: { message: string; type: string }): Observable<Notification> {return this.http.post<Notification>(`${this.apiUrl}api/notification/create`, notification);}
  loadCommands(): Observable<Notification[]> { return this.http.get<Notification[]>(`${this.apiUrl}api/notification/unreadcommand`);}
  commandmarkAsRead(id: number): Observable<void> {return this.http.put<void>(`${this.apiUrl}api/notification/markAsReadcommand/${id}`, {}); }
  createCommand(command: { command: string; userid: string }): Observable<any> {return this.http.post<any>(`${this.apiUrl}api/notification/createcommand`, command);}
  getSettings(): Observable<any> {return this.http.get(`${this.apiUrl}`);}
  updateSettings(settings: any): Observable<any> {return this.http.put(`${this.apiUrl}`, settings);}
  getformlist(data: any):Observable<any> {const url = `${this.apiUrl}api/admin/getform`;return this.http.post<any>(url,data);}
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
  [x: string]: any;
  private logindashapi = 'http://localhost:8080/';
  private adminmoduleapi = 'http://localhost:8081/';
  private communicationocrmoduleapi = 'http://localhost:8082/';
  private mastermoduleapi = 'http://localhost:8083/';

  private apiUrl = 'http://localhost:8073/';
  constructor(private http: HttpClient,private router: Router) {}

  //list(): Observable<string> {return this.http.get<string>(`${this.apiUrl}api/admin/loginlist`);}
  deleteData(id: number): Observable<any> {const url = `${this.apiUrl}/delete/${id}`;return this.http.delete(url);}
  //updateData(data: any,id: String): Observable<any> {const url = `${this.apiUrl}api/profile/update/${id}`; return this.http.post<any>(url,data);}
  edit(id: number): Observable<any> {const url = `${this.apiUrl}/edit/${id}`;return this.http.get<any>(url);}
  saveData(data: any): Observable<any> {var url=this.apiUrl+'api/admin/save';return this.http.post<any>(url,data);}
  sendMail(id: number): Observable<any> {const url = `${this.apiUrl}/mail/${id}`; return this.http.post(url, {});}
  uploadExcel(formData: FormData): Observable<any> {return this.http.post<any>(`${this.apiUrl}/upload`, formData);}
  downloadExcel(): Observable<Blob> {return this.http.get(`${this.apiUrl}/download`, { responseType: 'blob' });}
 // getLastUser():Observable<any> {const url = `${this.apiUrl}api/admin/lastuser`;return this.http.get<any>(url);}
  //admindata():Observable<string> {return this.http.get<string>(`${this.apiUrl}api/admin/adminlist`);}
  //getempdata(): Observable<string> {return this.http.get<string>(`${this.apiUrl}api/admin/emplistdata`);}
 // getLoginData(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/dashboard/getlogindata`); }
 // login(username: string, password: string): Observable<any> {const data = { username, password };return this.http.post(`${this.apiUrl}auth/login`, { username, password });}
  //view(id: String): Observable<any> {const url = `${this.apiUrl}api/profile/view/${id}`;return this.http.get<any>(url);}
  //ocruploadinvoice(formData:FormData):Observable<any> {return this.http.post<any>(`${this.apiUrl}api/ocr/PDFofPo`, formData);}
  //ocruploadpo(formData:FormData):Observable<any> {return this.http.post<any>(`${this.apiUrl}api/ocr/PDFofAgree`, formData);}
  //ocruploadcompare(detailTable: any[], aggreDetail: any[]): Observable<any> {const requestBody = {detailTable: detailTable,aggreDetail: aggreDetail};return this.http.post<any>(`${this.apiUrl}api/ocr/compare`, requestBody);}
 // sendMessage(message: string) {this.socket.emit('chat_message', message);}
  //sendmail(data:any): Observable<any> {var url=this.apiUrl+'api/email/send';return this.http.post<any>(url,data);}
  //newReg(data: any): Observable<any> {var url=this.apiUrl+'api/register/save';return this.http.post<any>(url,data);}
  //changepass(data: any): Observable<any> {var url=this.apiUrl+'api/register/passchange';return this.http.post<any>(url,data);}
  //sendMessage(message: any):Observable<any> {var url=this.apiUrl+'api/messages/save';return this.http.post<any>(url,message);}
  //getChatHistory(details:any): Observable<any> {var url=this.apiUrl+'api/messages/chat';return this.http.get<any>(url,details);}
  //getChatHistory(message: any):Observable<any> {var url=this.apiUrl+'api/messages/retrive';return this.http.post<any>(url,message);}
  //getChatperson():Observable<any> {var url=this.apiUrl+'api/messages/getpersonList';return this.http.get<any>(url);}
  //getChatHistorybyId(message: any):Observable<any> {var url=this.apiUrl+'api/messages/retrivebyid';return this.http.post<any>(url,message);}
  //getChatData(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/dashboard/getChatData`); }
  //formdetails(usrid:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/admin/formdetails/${usrid}`); }
  //saveuserrightData(data: any): Observable<any> {const url = `${this.apiUrl}api/admin/saverights`; return this.http.post<any>(url,data);}
  //userList(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/admin/userList`); }
  //useredit(userid: any): Observable<any> {const url = `${this.apiUrl}api/admin/userrightsedit/${userid}`;return this.http.get<any>(url);}
  //userDelete(userid: any): Observable<any> {const url = `${this.apiUrl}api/admin/userrightsdelete/${userid}`;return this.http.delete(url);}
  getcheckcomment(userid: any):Observable<any> {const url = `${this.apiUrl}api/admin/checkcomment/${userid}`;return this.http.get<any>(url);}
  //formList(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.apiUrl}api/admin/formList`); }
  //saveformData(data: any): Observable<any> {const url = `${this.apiUrl}api/admin/saveform`; return this.http.post<any>(url,data);}
  //formedit(formid: any): Observable<any> {const url = `${this.apiUrl}api/admin/editform/${formid}`;return this.http.get<any>(url);}
  //updateformData(data: any): Observable<any> {const url = `${this.apiUrl}api/admin/updateform`; return this.http.post<any>(url,data);}
  //formDelete(formid: any): Observable<any> {const url = `${this.apiUrl}api/admin/deleteform/${formid}`;return this.http.delete(url);}
  //getUnreadNotifications(): Observable<Notification[]> { return this.http.get<Notification[]>(`${this.apiUrl}api/notification/unread`);}
  //markAsRead(id: number): Observable<void> {return this.http.put<void>(`${this.apiUrl}api/notification/markAsRead/${id}`, {}); }
  //createNotification(notification: { message: string; type: string }): Observable<Notification> {return this.http.post<Notification>(`${this.apiUrl}api/notification/create`, notification);}
  //loadCommands(): Observable<Notification[]> { return this.http.get<Notification[]>(`${this.apiUrl}api/notification/unreadcommand`);}
  //commandmarkAsRead(id: number): Observable<void> {return this.http.put<void>(`${this.apiUrl}api/notification/markAsReadcommand/${id}`, {}); }
  //createCommand(command: { command: string; userid: string }): Observable<any> {return this.http.post<any>(`${this.apiUrl}api/notification/createcommand`, command);}
  getSettings(): Observable<any> {return this.http.get(`${this.apiUrl}`);}
  updateSettings(settings: any): Observable<any> {return this.http.put(`${this.apiUrl}`, settings);}
  //getformlist(data: any):Observable<any> {const url = `${this.apiUrl}api/admin/getform`;return this.http.post<any>(url,data);}
  
  //microservice 
  //Login Dashboard Header
  login(userid: string, password: string): Observable<any> {const data = { userid, password };return this.http.post(`${this.logindashapi}api/loginmodule/login`, { userid, password });}
  getLoginData(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.logindashapi}api/loginmodule/getlogindata`); }
  getChatData(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.logindashapi}api/loginmodule/getChatData`); }
  list(): Observable<string> {return this.http.get<string>(`${this.logindashapi}api/loginmodule/loginlist`);}
  getLastUser(LuserId:any):Observable<any> {const url = `${this.logindashapi}api/loginmodule/lastuser/${LuserId}`;return this.http.get<any>(url);}
  getformlist(data: any):Observable<any> {const url = `${this.logindashapi}api/loginmodule/getform`;return this.http.post<any>(url,data);}
  newReg(data: any): Observable<any> {var url=this.logindashapi+'api/loginmodule/save';return this.http.post<any>(url,data);}
  changepass(data: any): Observable<any> {var url=this.logindashapi+'api/loginmodule/passchange';return this.http.post<any>(url,data);}
  getattendancedata(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.logindashapi}api/loginmodule/getattendancedata`); }
  gettaskdata(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.logindashapi}api/loginmodule/gettaskdata`); }

  //Admin Module
  getUnreadNotifications(): Observable<Notification[]> { return this.http.get<Notification[]>(`${this.adminmoduleapi}api/adminmodule/unread`);}
  markAsRead(id: number): Observable<void> {return this.http.put<void>(`${this.adminmoduleapi}api/adminmodule/markAsRead/${id}`, {}); }
  createNotification(notification: { message: string; type: string }): Observable<Notification> {return this.http.post<Notification>(`${this.adminmoduleapi}api/adminmodule/create`, notification);}
  loadCommands(): Observable<Notification[]> { return this.http.get<Notification[]>(`${this.adminmoduleapi}api/adminmodule/unreadcommand`);}
  commandmarkAsRead(id: number): Observable<void> {return this.http.put<void>(`${this.adminmoduleapi}api/adminmodule/markAsReadcommand/${id}`, {}); }
  createCommand(command: { command: string; userid: string }): Observable<any> {return this.http.post<any>(`${this.adminmoduleapi}api/adminmodule/createcommand`, command);}
  view(id: String): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/view/${id}`;return this.http.get<any>(url);}
  updateData(data: any,id: String): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/update/${id}`; return this.http.post<any>(url,data);}
  formdetails(usrid:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.adminmoduleapi}api/adminmodule/formdetails/${usrid}`); }
  saveuserrightData(data: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/saverights`; return this.http.post<any>(url,data);}
  userList(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.adminmoduleapi}api/adminmodule/userList`); }
  useredit(userid: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/userrightsedit/${userid}`;return this.http.get<any>(url);}
  userDelete(userid: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/userrightsdelete/${userid}`;return this.http.delete(url);}
  formList(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.adminmoduleapi}api/adminmodule/formList`); }
  saveformData(data: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/saveform`; return this.http.post<any>(url,data);}
  formedit(formid: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/editform/${formid}`;return this.http.get<any>(url);}
  updateformData(data: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/updateform`; return this.http.post<any>(url,data);}
  formDelete(formid: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/deleteform/${formid}`;return this.http.delete(url);}
  savemoduleData(data: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/savemodule`; return this.http.post<any>(url,data);}
  moduleList(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.adminmoduleapi}api/adminmodule/moduleList`); }
  moduleedit(moduleid: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/editmodule/${moduleid}`;return this.http.get<any>(url);}
  updatemoduleData(data: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/updatemodule`; return this.http.post<any>(url,data);}
  moduleDelete(moduleid: any): Observable<any> {const url = `${this.adminmoduleapi}api/adminmodule/deletemodule/${moduleid}`;return this.http.delete(url);}

  //communicationocrmodule
  sendMessage(message: any):Observable<any> {var url=this.communicationocrmoduleapi+'api/communicationocrmodule/save';return this.http.post<any>(url,message);}
  getChatHistory(message: any):Observable<any> {var url=this.communicationocrmoduleapi+'api/communicationocrmodule/retrive';return this.http.post<any>(url,message);}
  getChatperson():Observable<any> {var url=this.communicationocrmoduleapi+'api/communicationocrmodule/getpersonList';return this.http.get<any>(url);}
  getChatHistorybyId(message: any):Observable<any> {var url=this.communicationocrmoduleapi+'api/communicationocrmodule/retrivebyid';return this.http.post<any>(url,message);}
  sendmail(data:any): Observable<any> {var url=this.communicationocrmoduleapi+'api/communicationocrmodule/send';return this.http.post<any>(url,data);}
  ocruploadinvoice(formData:FormData):Observable<any> {return this.http.post<any>(`${this.communicationocrmoduleapi}api/communicationocrmodule/PDFofPo`, formData);}
  ocruploadpo(formData:FormData):Observable<any> {return this.http.post<any>(`${this.communicationocrmoduleapi}api/communicationocrmodule/PDFofAgree`, formData);}
  ocruploadcompare(detailTable: any[], aggreDetail: any[]): Observable<any> {const requestBody = {detailTable: detailTable,aggreDetail: aggreDetail};return this.http.post<any>(`${this.communicationocrmoduleapi}api/communicationocrmodule/compare`, requestBody);}
  createpost(formData: FormData): Observable<any> {return this.http.post<any>(`${this.communicationocrmoduleapi}api/communicationocrmodule/createpost`,formData);}
  
  //MasterModule
  empList(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getEmployeeList`); }
  empedit(userId: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editemp/${userId}`;return this.http.get<any>(url);}
  updateempData(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/updateemp`; return this.http.post<any>(url,data);}
  saveempData(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/saveemp`; return this.http.post<any>(url,data);}
  empDelete(userId: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deleteemp/${userId}`;return this.http.delete(url);}
  getempdata(): Observable<string> {return this.http.get<string>(`${this.mastermoduleapi}api/mastermodule/emplistdata`);}
  admindata():Observable<string> {return this.http.get<string>(`${this.mastermoduleapi}api/mastermodule/adminlist`);}
  checkIn(userid: any): Observable<void> {return this.http.put<void>(`${this.mastermoduleapi}api/hrmsmodule/checkin/${userid}`, {}); }
  attendanceList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/hrmsmodule/getAttendanceList/${luser}`); }
  checkOut(attendanceid: any): Observable<void> {return this.http.put<void>(`${this.mastermoduleapi}api/hrmsmodule/checkout/${attendanceid}`, {}); }
  deleteattendance(attendanceid: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/deleteattendance/${attendanceid}`;return this.http.delete(url);}
  attendanceEdit(attendanceid: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/editattendance/${attendanceid}`;return this.http.get<any>(url);}
  attendanceExcell(luser:any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/attendanceexcell/${luser}`;return this.http.get<any>(url);}
  updateattendance(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/updateattendance`; return this.http.post<any>(url,data);}
  savetask(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/savetask`; return this.http.post<any>(url,data);}
  taskList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/hrmsmodule/gettasklist/${luser}`); }
  taskEdit(taskid: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/edittask/${taskid}`;return this.http.get<any>(url);}
  deletetask(taskid: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/deletetask/${taskid}`;return this.http.delete(url);}
  taskExcell(luser:any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/taskexcell/${luser}`;return this.http.get<any>(url);}
  saveholiday(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/saveholiday`; return this.http.post<any>(url,data);}
  holidayList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getholidaylist/${luser}`); }
  holidayEdit(holidayid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editholiday/${holidayid}`;return this.http.get<any>(url);}
  deleteholiday(holidayid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deleteholiday/${holidayid}`;return this.http.delete(url);}
  saveupdateleaveType(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/saveleavetype`; return this.http.post<any>(url,data);}
  leavetypeList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getleavetypelist/${luser}`); }
  leavetypeEdit(leavetypeid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editleavetype/${leavetypeid}`;return this.http.get<any>(url);}
  deleteleavetype(leavetypeid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deleteleavetype/${leavetypeid}`;return this.http.delete(url);}
  leavedetails(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/leavedetails`); }
  saveupdateleavedec(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/saveleavedecl`; return this.http.post<any>(url,data);}
  leavedeclList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getleavedecllist/${luser}`); }
  editleavedecl(leavedeclid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editleavedecl/${leavedeclid}`;return this.http.get<any>(url);}
  leavedeclDelete(leavedeclid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deleteleavedecl/${leavedeclid}`;return this.http.delete(url);}
  empleavedetails(emp:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/empleavedetails/${emp}`); }
  saveleaveapplic(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/saveleaveapplic`; return this.http.post<any>(url,data);}
  leaveappliclList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/hrmsmodule/getleaveappliclList/${luser}`); }
  editlleaveapplic(leaveapplicid: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/editlleaveapplic/${leaveapplicid}`;return this.http.get<any>(url);}
  leaveapplicDelete(leaveapplicid: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/deleteleaveapplic/${leaveapplicid}`;return this.http.delete(url);}
  searchlist(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/getattendancesearchList`; return this.http.post<any>(url,data);}
  searchExcell(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/getattendancesearchexcell`; return this.http.post<any>(url,data);}
  saveemoj(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/saveemoj`; return this.http.post<any>(url,data);}
  emojList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getemojlist/${luser}`); }
  emojEdit(emojid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editemoj/${emojid}`;return this.http.get<any>(url);}
  deleteemoj(emojid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deleteemoj/${emojid}`;return this.http.delete(url);}
  savecurrency(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/savecurrency`; return this.http.post<any>(url,data);}
  currencyList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getcurrencylist/${luser}`); }
  currencyEdit(currencyid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editcurrency/${currencyid}`;return this.http.get<any>(url);}
  deletecurrency(currencyid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deletecurrency/${currencyid}`;return this.http.delete(url);}
  saveregion(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/saveregion`; return this.http.post<any>(url,data);}
  regionList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getregionlist/${luser}`); }
  regionEdit(regionid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editregion/${regionid}`;return this.http.get<any>(url);}
  deleteregion(regionid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deleteregion/${regionid}`;return this.http.delete(url);}
  getregiondrop():Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getregiondropdown`); }
  savecountry(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/savecountry`; return this.http.post<any>(url,data);}
  countryList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getcountrylist/${luser}`); }
  countryEdit(countryid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editcountry/${countryid}`;return this.http.get<any>(url);}
  deletecountry(countryid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deletecountry/${countryid}`;return this.http.delete(url);}
  getcountrydrop():Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getcountrydropdown`); }
  getstatedrop():Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getstatedropdown`); }
  savestate(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/savestate`; return this.http.post<any>(url,data);}
  stateList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getstatelist/${luser}`); }
  stateEdit(stateid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editstate/${stateid}`;return this.http.get<any>(url);}
  deletestate(stateid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deletestate/${stateid}`;return this.http.delete(url);}
  savecity(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/savecity`; return this.http.post<any>(url,data);}
  cityList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/mastermodule/getcitylist/${luser}`); }
  cityEdit(cityid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/editcity/${cityid}`;return this.http.get<any>(url);}
  deletecity(cityid: any): Observable<any> {const url = `${this.mastermoduleapi}api/mastermodule/deletecity/${cityid}`;return this.http.delete(url);}
 
  //Payroll
  saveupdatecreditdebit(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/payrollmodule/savecreditdebit`; return this.http.post<any>(url,data);}
  creditdebitList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/payrollmodule/getcreditdebitlist/${luser}`); }
  creditdebitEdit(creditdebitid: any): Observable<any> {const url = `${this.mastermoduleapi}api/payrollmodule/editcreditdebit/${creditdebitid}`;return this.http.get<any>(url);}
  deletecreditdebit(creditdebitid: any): Observable<any> {const url = `${this.mastermoduleapi}api/payrollmodule/deletecreditdebit/${creditdebitid}`;return this.http.delete(url);}
  creditdibitdetails(): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/payrollmodule/creditdebitdetails`); }
  saveupdatesalaryfixation(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/payrollmodule/savesalaryfixation`; return this.http.post<any>(url,data);}
  salaryfixationlList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/payrollmodule/getsalaryfixationlist/${luser}`); }
  salaryfixationEdit(empid: any): Observable<any> {const url = `${this.mastermoduleapi}api/payrollmodule/editsalaryfixation/${empid}`;return this.http.get<any>(url);}
  salaryfixationDelete(empid: any): Observable<any> {const url = `${this.mastermoduleapi}api/payrollmodule/deletesalaryfixation/${empid}`;return this.http.delete(url);}
  generatepayroll(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/payrollmodule/payrollgeneration`; return this.http.post<any>(url,data);}
  saveupdateleaveentry(data: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/saveleaveentry`; return this.http.post<any>(url,data);}
  leaveentryList(luser:any): Observable<{ data: any[] }> {return this.http.get<{ data: any[] }>(`${this.mastermoduleapi}api/hrmsmodule/getleaveentryList/${luser}`); }
  leaveentryEdit(leaveentryid: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/editlleaveentry/${leaveentryid}`;return this.http.get<any>(url);}
  deleteleaveentry(leaveentryid: any): Observable<any> {const url = `${this.mastermoduleapi}api/hrmsmodule/deleteleaveentry/${leaveentryid}`;return this.http.delete(url);}
  

}

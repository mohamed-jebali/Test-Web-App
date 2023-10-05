import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class  ConfigService {

  private baseUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }
  
  deleteData(id: number): Observable<any> {
    const deleteUrl = `${this.baseUrl}/${id}`;
    return this.http.delete(deleteUrl).pipe(
      catchError((error: any) => {
        console.error('Delete request failed:', error);
        throw error;
      })
    );
  }
  
  getDataById(id: number): Observable<any> {
    const getUrl = `${this.baseUrl}/${id}`;
    return this.http.get<any>(getUrl);
  }
  
  updateData(id: number, newData: any): Observable<any> {
    const updateUrl = `${this.baseUrl}/${id}`;
    return this.http.put(updateUrl, newData);
  }

  createData(newData:any): Observable<any>{
    const createUrl = `${this.baseUrl}`;
    return this.http.post(createUrl,newData)
  }
}

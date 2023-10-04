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
        // Handle the error here (e.g., log it or return a specific error message).
        console.error('Delete request failed:', error);
        throw error; // Rethrow the error to propagate it to the component.
      })
    );
  }
  

  updateData(id: number, newData: any): Observable<any> {
    const updateUrl = `${this.baseUrl}/${id}`;
    return this.http.put(updateUrl, newData);
  }
}

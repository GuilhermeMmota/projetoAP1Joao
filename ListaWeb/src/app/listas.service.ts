import { Listas } from './shared/models/listas.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, from } from 'rxjs';


var httpOptions = {headers: new HttpHeaders({ "Content-Type": "application/json" })};

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  private url = 'https://localhost:5001/api/Listas';

  constructor(
    private http: HttpClient
  ) { }

  public create(newListas: any): Observable<any> {
    return this.http.post(this.url, newListas, httpOptions);
  }

  public retrievetById(id: number): Observable<Listas> {
    return this.http.get<Listas>(`${this.url}/${id}`);
  }

  public retrieveAll(): Observable<Listas[]> {
    return this.http.get<Listas[]>(this.url);
  }

  public update(updatedListas: Listas): Observable<Listas> {
    return this.http.put<Listas>(`${this.url}/${updatedListas.id}`, updatedListas, httpOptions);
  }

  public delete(id: number): Observable<number> {
    return this.http.delete<number>(`${this.url}/${id}`);
  }

}

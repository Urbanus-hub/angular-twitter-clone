import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // ✅ Ensures the service is available globally
})
export class ApiService {
  private BASE_URL = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/users`);
  }

  getPostsByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/posts?userId=${userId}`);
  }

  getCommentsByPost(postId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.BASE_URL}/comments?postId=${postId}`);
  }
}

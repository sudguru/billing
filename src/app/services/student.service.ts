import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  endpoint = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  async getStudents() {
    return await this.http.get(`${this.endpoint}/students`).toPromise();
  }
  async getStudentList() {
    return await this.http.get(`${this.endpoint}/students/list`).toPromise();
  }
}

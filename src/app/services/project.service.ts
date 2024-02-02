import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Project, ProjectsResponse } from '../types/project';
import { ApiResponse } from '../types/response';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = 'http://localhost:8080/v1/projects/';

  constructor(private http: HttpClient) {
  }

  createProject(body: any): Observable<Project> {
    const url = `${this.apiUrl}/newProject`;

    return this.http.post<Project>(url, body)
      .pipe(catchError(this.handleError));
  }

  getProjectList(): Observable<ProjectsResponse> {
    return this.http.get<ProjectsResponse>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getProjectById(projectId: number): Observable<Project> {
    const url = `${this.apiUrl}/getById/${projectId}`;
    
    return this.http.get<Project>(url)
      .pipe(catchError(this.handleError));
  }

  updateProject(body: Project): Observable<ProjectsResponse> {
    const url = `${this.apiUrl}/updateProject/${body.id}`;

    return this.http.put<ProjectsResponse>(url, body)
      .pipe(catchError(this.handleError));
  }

  deleteProject(projectId: number): Observable<ApiResponse> {
    const url = `${this.apiUrl}/deleteProject/${projectId}`;

    return this.http.delete<ApiResponse>(url)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

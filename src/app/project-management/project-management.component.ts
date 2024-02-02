import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { EMPTY, Observable, catchError } from 'rxjs';
import { Project, ProjectsResponse } from '../types/project';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-project-management',
  standalone: true,
  imports: [AsyncPipe, FormsModule],
  templateUrl: './project-management.component.html',
  styleUrl: './project-management.component.sass'
})
export class ProjectManagementComponent implements OnInit{
  projectsMOCK = [
    {
      "id": 1,
      "name": "Aplicación web para gestión de stock en almacenes",
      "startDate": "2024-01-01",
      "endDate": "2024-05-25",
      "managerId": 1,
      "createdAt": "2024-02-01T20:21:59.464459",
      "updatedAt": "2024-02-01T20:21:59.464459"
    },
    {
      "id": 2,
      "name": "Aplicación móvil para manejar ordenes de ventas",
      "startDate": "2024-01-01",
      "endDate": "2024-05-25",
      "managerId": 1,
      "createdAt": "2024-02-01T20:33:30.153996",
      "updatedAt": "2024-02-01T20:33:30.153996"
    },
    {
      "id": 3,
      "name": "test de conexión",
      "startDate": "2024-01-01",
      "endDate": "2024-05-25",
      "managerId": 1,
      "createdAt": "2024-02-01T20:34:46.78378",
      "updatedAt": "2024-02-01T20:34:46.78378"
    }
  ]


  public projectResults$!: Observable<ProjectsResponse>;
  public projectResultsById$!: Observable<Project>;
  public errorMessage!: string;

  projectName: string = "";
  projectStartDate: string = "";
  projectEndDate: string = "";
  projectManagerId: number = 0;

  constructor(private service: ProjectService) { }

  ngOnInit(): void {
    // this.getProjectById(1);
  }

  BuscarProyecto(id: number) {

  }
  getProjects() {
    this.projectResults$ = this.service.getProjectList().pipe(catchError((error: string) => {
      this.errorMessage = error;

      // Retornar observable vacío para que el componente no falle
      return EMPTY;
    }));
  }

  getProjectById(id: number) {
    // // Forma con Observable
    // this.projectResultsById$ = this.service.getProjectById(id).pipe(catchError((error: string) => {
    //   this.errorMessage = error;
    //   // Retornar observable vacío para que el componente no falle
    //   return EMPTY;
    // }));

    this.service.getProjectById(id).subscribe(
      {
        next: res => {
          console.log(res);
        },
        error: err => {
          console.error(err);
        }
      }
    );
  }



  createNewProject() {
    const body = {
      name: this.projectName,
      startDate: this.projectStartDate,
      endDate: this.projectEndDate,
      managerId: this.projectManagerId,
    }

    this.service.createProject(body).subscribe(
      {
        next: res => {
          this.getProjects();
          console.log(res);

        },
        error: err => {
          console.error(err);
        }
      }
    );
  }

  deleteProject(id: number) {
    this.service.deleteProject(id).subscribe(
      {
        next: res => {
          this.getProjects();
          console.log(res);
        },
        error: err => {
          console.error(err);
        }
      }
    );
  }
}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProjectManagementComponent } from './project-management/project-management.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProjectManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'angular-17-app';
}

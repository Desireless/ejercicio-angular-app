export type Project = {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    managerId: number;
    createdAt: string;
    updatedAt: string;
  }
  
  export type ProjectsResponse = Project[];
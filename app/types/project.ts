export interface ProjectBudget {
  total?: number | null;
  hourFrom?: number | null;
  hourTo?: number | null;
}

export interface ProjectOrganization {
  name: string;
  logo: string;
}

export interface Project {
  id: string;
  title: string;
  skillNames?: string[];
  categoryName?: string;
  industryName?: string;
  budget?: ProjectBudget;
  organization: ProjectOrganization;
}

export type SearchParams = {
  [key: string]: string | string[] | undefined;
}
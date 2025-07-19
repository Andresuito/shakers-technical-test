export interface ApiData {
  id: string;
  name: string;
}

export interface FilterOption {
  value: string;
  label: string;
}

export interface FilterOptions {
  specialties: FilterOption[];
  skills: FilterOption[];
  projectType: FilterOption[];
  industries: FilterOption[];
}

export interface FilterState {
  specialties: string[];
  skills: string[];
  projectType: string[];
  industries: string[];
  sortOrder: string;
}
export interface Position {
  id: number;
  title: string;
  skillNames: string[];
  specialtyNames: string[];
  referralBonus: number;
}

export interface TeamPositionsProps {
  positions: Position[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface FAQSectionProps {
  faqs: FAQ[];
}

export interface ProjectDetail {
  id: number;
  title: string;
  description: string;
  organization: {
    id: number;
    name: string;
    logo: string;
    industry: number;
  };
  projectLeader: {
    id: number;
    name: string;
    lastName: string;
  };
  budget: {
    hourFrom?: number;
    hourTo?: number;
    total?: number;
  };
  totalHours: number;
  startDate: string;
  publishedAt: string;
  status: string;
  goals: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  positions: Array<{
    id: number;
    title: string;
    skillNames: string[];
    specialtyNames: string[];
    referralBonus: number;
  }>;
  skillNames: string[];
  specialtyNames: string[];
  categoryName: string;
  industryName: string;
}
export interface Project {
  id: string;
  title: string;
  category: 'graphic' | 'level';
  tags: string[];
  image: string;
  description: string;
  details: string[];
  year: string;
  client?: string;
  software?: string[];
}

export interface UniversityProject {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  description: string;
}

export interface Strength {
  id: string;
  title: string;
  iconName: string;
  desc: string;
  skills: string[];
}

export interface Experience {
  id: string;
  period: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
}

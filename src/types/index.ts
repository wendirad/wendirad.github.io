// Type definitions for info.json data structure

export interface PersonalInfo {
  name: string;
  title: string;
  phone: string;
  email: string;
  github: string;
  linkedin: string;
  website: string;
  location: string;
  summary: string;
  image: {
    light: string;
    dark: string;
  };
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface Experience {
  title: string;
  company: string;
  address: string;
  type: 'fulltime' | 'contract' | 'parttime';
  dates: DateRange;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  major: string;
  institution: string;
  address: string;
  dates: DateRange;
  gpa: string;
  notes: string;
}

export interface Project {
  name: string;
  description: string;
  tags: string[];
  tools: string[];
  links: {
    repo: string;
    live: string;
  };
  images: {
    thumbnail: string;
    gallery: string[];
  };
}

export interface SkillItem {
  id: string;
  label: string;
  icon: string | null;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  label: string;
  icon: string | null;
  items: SkillItem[];
}

export interface Skills {
  technical: SkillCategory[];
  soft: SkillCategory[];
}

export interface Award {
  id: string;
  name: string;
  description: string;
  date: string;
  issuer: string;
  tags: string[];
  link: string;
  image: string;
}

export interface Reference {
  id: string;
  name: string;
  position: string;
  company: string;
  email: string;
  phone: string;
  relationship: string;
  notes: string;
}

export interface PortfolioData {
  info: PersonalInfo;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skills;
  awards: Award[];
  references: Reference[];
}


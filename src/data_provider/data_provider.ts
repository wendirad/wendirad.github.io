export interface User {
  personal_information: PersonalInformation;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: Skills;
  awards: Award[];
  references: Reference[];
}

export interface Institution {
  name: string;
  url: string;
  logo?: string;
  location: string;
}

export interface DataRange {
  start_date: string;
  end_date: string;
}

export interface PersonalInformation {
  name: string;
  title: string;
  phone: string;
  location: string;
  email: string;
  website: string;
  summary: string;
  social_links: SocialLink[];
  blog_url: string;
  about_descriptions: string[];
  photo: Photo;
  cv_link: string;
}

export interface SocialLink {
  id: string;
  title: string;
  url: string;
}

export interface Photo {
  light: string;
  dark: string;
  default?: string;
}

export interface Experience {
  id: string;
  title: string;
  institution: Institution;
  mode: string;
  type: string;
  date_range: DataRange;
  responsibilities: string[];
}

export interface Education {
  id: string;
  degree: string;
  major: string;
  institution: Institution;
  date_range: DataRange;
  gpa: string;
  notes?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  tools: string[];
  link: ProjectLink;
  image: ProjectImage;
}

export interface ProjectLink {
  repo: string;
  live: string;
}

export interface ProjectImage {
  thumbnail: string;
  gallery: string[];
}

export interface Skills {
  technical: TechnicalSkill[];
  soft: SoftSkill[];
}

export interface Skill {
  id: string;
  label: string;
  icon: string | null;
  tags: string[];
  level?: string;
}

export interface TechnicalSkill {
  id: string;
  label: string;
  icon: string | null;
  skills: Skill[];
}

export interface SoftSkill {
  id: string;
  label: string;
  icon: string | null;
  skills: Skill[];
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
  institution: Institution;
  email: string;
  phone: string;
  relationship: string;
  notes: string;
}

class DataProvider {
  personalInformation: PersonalInformation;
  educations: Education[];
  experiences: Experience[];
  projects: Project[];
  skills: Skills;
  technical_skills: TechnicalSkill[];
  soft_skills: SoftSkill[];
  awards: Award[];
  references: Reference[];

  constructor(data: User) {
    this.personalInformation = data.personal_information;
    this.educations = data.educations;
    this.experiences = data.experiences;
    this.projects = data.projects;
    this.skills = data.skills;
    this.technical_skills = data.skills.technical;
    this.soft_skills = data.skills.soft;
    this.awards = data.awards;
    this.references = data.references;
  }
}

export default DataProvider;

export interface ProfileLinks {
  portfolio: string;
  website: string;
  telegram: string;
  linkedin: string;
  medium: string;
}

export interface FocusArea {
  domain: string;
  description: string;
  technologies: string[];
}

export interface TechStack {
  languages: string[];
  backend: string[];
  data: string[];
  infrastructure: string[];
  frontend: string[];
}

export interface ProfileArticle {
  title: string;
  topic: string;
  url: string;
}

export interface ProfileConfig {
  username: string;
  name: string;
  title: string;
  headline: string;
  summary: string;
  location: string;
  email: string;
  links: ProfileLinks;
  company: { name: string; url: string; role: string };
  focusAreas: FocusArea[];
  principles: string[];
  techStack: TechStack;
  bios: { en: string; uz: string; ru: string };
  articles: ProfileArticle[];
  theme: { accent: string };
}

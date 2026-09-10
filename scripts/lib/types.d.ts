export interface ProfileLinks {
  portfolio: string;
  website: string;
  telegram: string;
  linkedin: string;
  medium: string;
}

export interface ProfileBio {
  tagline: string;
  expertise: string;
  approach: string;
  funFact: string;
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
  specialization: string;
  email: string;
  links: ProfileLinks;
  company: { name: string; url: string };
  theme: { primary: string; secondary: string; accent: string };
  typingLines: string[];
  bios: { en: ProfileBio; uz: ProfileBio; ru: ProfileBio };
  articles: ProfileArticle[];
  quotes: string[];
}

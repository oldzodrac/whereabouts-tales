export interface Episode {
  id: string;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  youtubeId: string;
  audioUrl?: string;
  coverImage: string;
}

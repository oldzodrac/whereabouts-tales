import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const EPISODES_PATH = path.join(process.cwd(), 'content/episodes');

export interface EpisodeData {
  slug: string;
  title: string;
  date: string;
  youtubeId?: string;
  excerpt: string;
  content: string;
}

export function getAllEpisodes(): EpisodeData[] {
  if (!fs.existsSync(EPISODES_PATH)) {
    return [];
  }

  const files = fs.readdirSync(EPISODES_PATH);

  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const filePath = path.join(EPISODES_PATH, file);
      const fileContent = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContent);
      const slug = file.replace(/\.md$/, '');

      return {
        slug,
        title: data.title,
        date: data.date,
        youtubeId: data.youtubeId,
        excerpt: data.excerpt,
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getEpisodeBySlug(slug: string): EpisodeData | null {
  const filePath = path.join(EPISODES_PATH, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    date: data.date,
    youtubeId: data.youtubeId,
    excerpt: data.excerpt,
    content,
  };
}

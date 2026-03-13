import { createClient } from '@sanity/client';
import { fallbackEpisodes } from './fallbackData';

export const client = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Reverting to true for performance, but with fallback
  apiVersion: '2023-05-03', // Reverting to a more stable version
});

const isConfigured = () => {
  const config = client.config();
  return config.projectId && config.projectId !== 'your-project-id';
};

export const getEpisodeBySlug = async (slug: string) => {
  if (!isConfigured()) return fallbackEpisodes.find(e => e.slug === slug) || null;
  const query = `*[_type == "episode" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    publishedAt,
    rssId,
    body,
    youtubeUrl
  }`;
  try {
    const data = await client.fetch(query, { slug });
    return data || fallbackEpisodes.find(e => e.slug === slug) || null;
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback data:', error);
    return fallbackEpisodes.find(e => e.slug === slug) || null;
  }
};

export const getAllEpisodes = async () => {
  if (!isConfigured()) return fallbackEpisodes;
  const query = `*[_type == "episode"] | order(publishedAt desc){
    title,
    "slug": slug.current,
    publishedAt,
    body,
    youtubeUrl
  }`;
  try {
    const data = await client.fetch(query);
    return data && data.length > 0 ? data : fallbackEpisodes;
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback data:', error);
    return fallbackEpisodes;
  }
};

export const getLatestEpisodes = async (limit: number = 3) => {
  if (!isConfigured()) return fallbackEpisodes.slice(0, limit);
  const query = `*[_type == "episode"] | order(publishedAt desc)[0...$limit]{
    title,
    "slug": slug.current,
    publishedAt,
    body,
    youtubeUrl
  }`;
  try {
    const data = await client.fetch(query, { limit });
    return data && data.length > 0 ? data : fallbackEpisodes.slice(0, limit);
  } catch (error) {
    console.warn('Sanity fetch failed, using fallback data:', error);
    return fallbackEpisodes.slice(0, limit);
  }
};

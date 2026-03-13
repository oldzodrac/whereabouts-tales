import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { episodeSchema } from './sanity/schema/episode';

export default defineConfig({
  name: 'default',
  title: 'Whereabouts Tales Studio',

  // These should be updated with actual Sanity project details
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.VITE_SANITY_DATASET || 'production',

  basePath: '/studio',

  plugins: [deskTool()],

  schema: {
    types: [episodeSchema],
  },
});

export const fallbackEpisodes = [
  {
    title: "The Whispering Woods of Aethelgard",
    slug: "whispering-woods",
    publishedAt: new Date().toISOString(),
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "Deep within the heart of the ancient forest, the trees hold secrets that only the wind can carry. This is a placeholder story while your Sanity CMS connection is being finalized." }]
      }
    ],
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
  },
  {
    title: "Shadows over the Silver Peak",
    slug: "silver-peak",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    body: [
      {
        _type: 'block',
        children: [{ _type: 'span', text: "The summit was hidden in clouds for a thousand years. Now, the veil has lifted. Connect your Sanity CMS to see your real stories here." }]
      }
    ]
  }
];

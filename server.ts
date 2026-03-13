import express from "express";
import { createServer as createViteServer } from "vite";
import Parser from "rss-parser";
import fetch from "node-fetch";
import { getAllEpisodes, getEpisodeBySlug } from "./src/lib/mdx.ts";

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  const parser = new Parser();

  // API Route for Local Episodes
  app.get("/api/episodes", (req, res) => {
    try {
      const episodes = getAllEpisodes();
      res.json(episodes);
    } catch (error) {
      console.error("Error fetching local episodes:", error);
      res.status(500).json({ error: "Failed to fetch episodes" });
    }
  });

  app.get("/api/episodes/:slug", (req, res) => {
    try {
      const episode = getEpisodeBySlug(req.params.slug);
      if (!episode) {
        return res.status(404).json({ error: "Episode not found" });
      }
      res.json(episode);
    } catch (error) {
      console.error("Error fetching local episode:", error);
      res.status(500).json({ error: "Failed to fetch episode" });
    }
  });

  // API Route for Podcast RSS
  app.get("/api/podcast", async (req, res) => {
    try {
      const RSS_URL = "https://anchor.fm/s/fe6afdfc/podcast/rss";
      const response = await fetch(RSS_URL, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch RSS: ${response.status} ${response.statusText}`);
      }

      const xml = await response.text();
      const feed = await parser.parseString(xml);
      
      res.json(feed);
    } catch (error) {
      console.error("Server-side RSS fetch error:", error);
      res.status(500).json({ error: "Podcast feed temporarily unavailable" });
    }
  });

  // GitHub OAuth for Decap CMS
  app.get("/api/auth", (req, res) => {
    const client_id = process.env.GITHUB_CLIENT_ID;
    if (!client_id) {
      return res.status(500).send("GITHUB_CLIENT_ID not configured");
    }
    res.redirect(
      `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=repo,user`
    );
  });

  app.get("/api/auth/callback", async (req, res) => {
    const { code } = req.query;
    const client_id = process.env.GITHUB_CLIENT_ID;
    const client_secret = process.env.GITHUB_CLIENT_SECRET;

    if (!code || !client_id || !client_secret) {
      return res.status(400).send("Missing parameters for OAuth callback");
    }

    try {
      const response = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          client_id,
          client_secret,
          code,
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        console.error("GitHub OAuth Error:", data.error, data.error_description);
        return res.status(400).send(`
          <html>
            <body>
              <script>
                window.opener.postMessage("authorization:github:error:${data.error_description || data.error}", window.opener.location.origin);
              </script>
              <p>Authentication failed: ${data.error_description || data.error}</p>
            </body>
          </html>
        `);
      }

      const token = data.access_token;
      console.log("Successfully received token from GitHub:", token ? "Token present" : "Token MISSING");
      console.log('GitHub Token being sent:', token);

      const content = `
        <html>
          <body>
            <script>
              (function() {
                const token = '${token}';
                const message = {
                  type: 'authorization-completed',
                  mg: {
                    token: token,
                    provider: 'github'
                  }
                };
                
                // Shout to the opener immediately
                if (window.opener) {
                  console.log('Opener origin:', window.opener.location.origin);
                  
                  // Send as object
                  window.opener.postMessage(message, window.opener.location.origin);
                  
                  // Send as string format Decap sometimes expects
                  window.opener.postMessage(
                    'authorization:github:success:' + JSON.stringify({token: token, provider: 'github'}),
                    window.opener.location.origin
                  );
                  
                  console.log('Token sent to opener.');
                  setTimeout(() => { window.close(); }, 1000);
                } else {
                  console.error('No opener found!');
                }
              })();
            </script>
            <p>Authorizing... you can close this window if it doesn't close automatically.</p>
          </body>
        </html>
      `;
      res.setHeader("Content-Type", "text/html");
      res.send(content);
    } catch (error) {
      console.error("OAuth callback error:", error);
      res.status(500).send("Internal Server Error during OAuth");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
    app.get("*", (req, res) => {
      res.sendFile("dist/index.html", { root: "." });
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const mood = searchParams.get("mood");
  const type = searchParams.get("type");
  const playlistId = searchParams.get("playlistId");
  const API_KEY = process.env.YOUTUBE_API_KEY;

  try {
    if (type === "playlist") {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=playlist&q=${encodeURIComponent(
          mood
        )}&maxResults=10&key=${API_KEY}`
      );
      const data = await response.json();

      if (!data.items || data.items.length === 0) {
        return new Response(JSON.stringify({ error: "No playlists found" }), {
          status: 404,
        });
      }
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const playlistId = data.items[randomIndex].id.playlistId;
      return new Response(JSON.stringify({ playlistId }), { status: 200 });
    } else if (type === "video") {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=50&key=${API_KEY}`
      );
      const data = await response.json();
      if (!data.items || data.items.length === 0) {
        return new Response(
          JSON.stringify({ error: "No videos found in playlist" }),
          { status: 404 }
        );
      }
      const randomIndex = Math.floor(Math.random() * data.items.length);
      const videoId = data.items[randomIndex].snippet.resourceId.videoId;
      return new Response(JSON.stringify({ videoId }), { status: 200 });
    } else {
      return new Response(JSON.stringify({ error: "Invalid type parameter" }), {
        status: 400,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
}

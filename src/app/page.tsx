"use client";

import { useState } from "react";

export default function Home() {
  const [selectedMood, setSelectedMood] = useState(null);
  const [playlistId, setPlaylistId] = useState(null);
  const [videoId, setVideoId] = useState(null);
  const [loading, setLoading] = useState(false);

  const moodQueries: { [key: string]: string | null } = {
    Hangry: "angry rock music",
    Wanderlust: "travel adventure music",
    Ennui: "lofi chill beats",
    Schadenfreude: "dark humor songs",
    Nostalgic: "80s hits playlist",
    Euphoric: "uplifting dance music",
    Melancholic: "sad emotional ballads",
    Mischievous: "playful jazz music",
    Zen: "meditation calm music",
    Caffeinated: "high energy EDM",
    Procaffeinating: "morning coffee jazz",
    FOMO: "party hits playlist",
    JOMO: "cozy acoustic songs",
    Hangxiety: "soothing ambient music",
    "Sunday Scaries": "motivational upbeat songs",
    Earwormed: "catchy pop hits",
    "Book Hangover": "epic soundtrack music",
    "Tech Frustrated": "angry metal songs",
    Overcaffeinated: "hyper techno music",
    "Decision Fatigue": "instrumental focus music",
    "Imposter Syndrome": "confidence boosting songs",
    "Analysis Paralysis": "clear mind meditation",
    "Revenge Bedtime Procrastination": "late night vibes playlist",
    "Zoom Fatigue": "relaxing nature sounds",
    "Inbox Zero Euphoria": "victory celebration music",
  };

  const getMoodImage = (mood: string) => {
    switch (mood) {
      case "Hangry":
        return "/hangry.webp";
      case "Wanderlust":
        return "/wanderlust.webp";
      case "Ennui":
        return "/ennui.webp";
      case "Schadenfreude":
        return "/schadenfreude.jpeg";
      case "Nostalgic":
        return "/nostalgic.jpeg";
      case "Euphoric":
        return "/euphoric.jpeg";
      case "Melancholic":
        return "/melancholic.jpeg";
      case "Mischievous":
        return "/mischievous.jpeg";
      case "Zen":
        return "/zen.jpeg";
      case "Caffeinated":
        return "/caffeinated.jpeg";
      case "Procaffeinating":
        return "/procaffeinated.jpeg";
      case "FOMO":
        return "/FOMO.jpeg";
      case "JOMO":
        return "/JOMO.jpeg";
      case "Hangxiety":
        return "/hangxiety.jpg";
      case "Sunday Scaries":
        return "/sundayscaries.jpeg";
      case "Earwormed":
        return "/earwormed.jpg";
      case "Book Hangover":
        return "/bookhangover.jpeg";
      case "Tech Frustrated":
        return "/techfrustrated.jpg";
      case "Overcaffeinated":
        return "/overcaffeinated.jpeg";
      case "Decision Fatigue":
        return "/decisionfatigue.jpeg";
      case "Imposter Syndrome":
        return "/impostersyndrome.jpg";
      case "Analysis Paralysis":
        return "/analysisparalysis.jpeg";
      case "Revenge Bedtime Procrastination":
        return "/procrastination.jpg";
      case "Zoom Fatigue":
        return "/zoomfatigue.jpg";
      case "Inbox Zero Euphoria":
        return "/inboxzero.jpg";
      default:
        return "";
    }
  };

  const fetchRandomPlaylist = async (mood: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/youtube?mood=${encodeURIComponent(
          moodQueries[mood] as string
        )}&type=playlist`
      );
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setPlaylistId(data.playlistId);
      setVideoId(null);
    } catch (error) {
      console.error("Error fetching playlist:", error);
    }
    setLoading(false);
  };

  const fetchRandomVideo = async () => {
    if (!playlistId) return;
    setLoading(true);
    try {
      const response = await fetch(
        `/api/youtube?playlistId=${playlistId}&type=video`
      );
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setVideoId(data.videoId);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
    setLoading(false);
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood as any);
    fetchRandomPlaylist(mood);
  };

  const handleBack = () => {
    setSelectedMood(null);
    setPlaylistId(null);
    setVideoId(null);
  };

  return (
    <div className="container">
      <main className="main">
        <h1 className="font-bold text-2xl md:text-6xl text-white font-[Lobster]">
          Mood Playlist Generator
        </h1>
        {!selectedMood ? (
          <>
            <p className="md:text-lg font-semibold text-gray-700 text-center">
              Select your mood to generate a random YouTube playlist!
            </p>
            <div className="moodGrid">
              {Object.keys(moodQueries).map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(mood)}
                  className="moodButton"
                  style={{
                    backgroundImage: "url(" + getMoodImage(mood) + ")",
                    backgroundSize: "cover",
                  }}
                >
                  <span className="relative z-10 w-full inline-block bg-black/50 rounded">
                    {mood}
                  </span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            <h2 className="md:text-lg font-semibold text-gray-700 text-center">
              Here's your mood: {selectedMood}
            </h2>
            {loading ? (
              <p className=" font-semibold text-gray-700 text-center">
                Loading...
              </p>
            ) : (
              <>
                {playlistId && !videoId && (
                  <div className="iframeContainer rounded">
                    <iframe
                      className="rounded"
                      src={`https://www.youtube.com/embed/videoseries?list=${playlistId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}
                {videoId && (
                  <div className="iframeContainer">
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )}

                <a
                  href={
                    videoId
                      ? `https://www.youtube.com/watch?v=${videoId}`
                      : `https://www.youtube.com/playlist?list=${playlistId}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 md:text-lg font-semibold relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400"
                >
                  <span className="flex flex-row items-center justify-center gap-2 sm:text-xl relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-8"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                      />
                    </svg>
                    {videoId
                      ? "Watch video on YouTube"
                      : "Open playlist in YouTube"}
                  </span>
                </a>
                <div className="buttonGroup font-bold text-xl flex flex-col sm:flex-row justify-center items-center">
                  <button
                    onClick={fetchRandomVideo}
                    disabled={!playlistId}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                  >
                    <span className="flex flex-row items-center justify-center gap-2 h-full sm:text-xl relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
                        />
                      </svg>
                      Get Random Video
                    </span>
                  </button>
                  <button
                    onClick={() => fetchRandomPlaylist(selectedMood)}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-500 to-pink-500 group-hover:from-purple-500 group-hover:to-pink-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800"
                  >
                    <span className="flex flex-row items-center justify-center gap-2 h-full sm:text-xl relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75"
                        />
                      </svg>{" "}
                      New Random Playlist
                    </span>
                  </button>
                  <button
                    onClick={handleBack}
                    className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                  >
                    <span className=" flex flex-row items-center justify-center gap-2 h-full sm:text-xl relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-transparent group-hover:dark:bg-transparent">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z"
                        />
                      </svg>
                      Back to moods
                    </span>
                  </button>
                </div>
              </>
            )}
          </>
        )}
        <a
          className="absolute top-4 left-4 text-xs text-white font-bold"
          href="https://danbrand.nyc"
        >
          Made with ❤️ in NYC
        </a>
      </main>
    </div>
  );
}

import { ArrowLineDown, CaretDoubleRight } from "phosphor-react";
import { FormEvent, useState } from "react";
import { Button } from "../components/Button";
import axios from "axios";

export default function Home() {
  const [videoLink, setVideoLink] = useState("");
  const [videoData, setVideoData] = useState({});
  const [hasData, setHasData] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVideoData = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true)
      const response = await axios({
        method: 'post',
        url: "/api/video",
        data: {
          videoLink
        }
      });

      if (response.data.found == true) {
        setVideoData(response.data)
        window.location.href = response.data.media[0].url
      } else {
        alert("Video not found. Please check the link.")
      }

      setIsLoading(false)

    } catch {
      alert("Error! Please check the link and try again.");
      setIsLoading(false)
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0A0A0F] to-[#1A1A1F]">
      {/* Animated background effect */}
      <div className="fixed inset-0 z-0 opacity-30">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMjIiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzBoMnYyaC0ydi0yem0wLTEyaDJ2MmgtMnYtMnptMCAyNGgydjJoLTJ2LTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50"></div>
      </div>

      {/* Homepage Button */}
      <div className="w-full flex justify-end p-4 relative z-10">
        <a
          href="https://ztr8.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="relative group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[2px] rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
        >
          <div className="relative px-6 py-2 bg-[#0A0A0F] rounded-[10px] leading-none">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500 font-semibold">
              Homepage
            </span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
        </a>
      </div>

      <form
        onSubmit={fetchVideoData}
        className="flex flex-col items-center justify-center max-w-4xl mx-auto px-4 relative z-10"
      >
        <h1 className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent text-4xl md:text-6xl lg:text-7xl font-bold mt-12 flex items-center justify-center gap-2 md:gap-4 text-center leading-tight">
          Universal Video
          <br />
          Downloader{" "}
          <ArrowLineDown
            className="text-blue-500 hidden md:inline lg:inline animate-bounce"
            weight="bold"
            size={48}
          />
        </h1>
        
        <p className="text-gray-300 text-center mt-8 text-lg md:text-xl max-w-2xl leading-relaxed">
          Download videos from multiple platforms with just one click
        </p>
        
        <div className="grid grid-cols-2 gap-6 mt-8 text-gray-300">
          {[
            "Twitter/X",
            "YouTube"
          ].map((platform) => (
            <div key={platform} className="flex items-center gap-3 bg-[rgba(255,255,255,0.05)] p-4 rounded-lg backdrop-blur-sm hover:bg-[rgba(255,255,255,0.08)] transition-all duration-300 transform hover:scale-105">
              <span className="text-green-400 text-xl">✓</span>
              <span className="font-medium">{platform}</span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center flex-col w-full backdrop-blur-sm">
          <div className="relative w-full max-w-[600px] group">
            <input
              required
              placeholder="Paste video link here..."
              value={videoLink}
              onChange={(event) => setVideoLink(event.target.value)}
              className="w-full text-gray-100 text-lg px-6 py-5 rounded-xl bg-[rgba(255,255,255,0.05)] border-2 border-[rgba(255,255,255,0.1)] outline-none focus:border-blue-500 transition-all duration-300 shadow-lg focus:shadow-blue-500/25"
              type="text"
            />
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          <Button type="submit" isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
}

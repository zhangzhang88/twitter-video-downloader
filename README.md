# Universal Video Downloader

A modern web application for downloading videos from Twitter/X and YouTube.

![Preview](/.github/assets/example.gif)

## Features

- ✨ Modern and clean user interface
- 🎥 Support for Twitter/X and YouTube videos
- 🚀 High-quality video downloads
- 💻 Easy to use: just paste the video link

## Prerequisites

Before running this project, you need to have [yt-dlp](https://github.com/yt-dlp/yt-dlp) installed on your system:

- On macOS (using Homebrew):
  ```bash
  brew install yt-dlp
  ```
- On Windows:
  ```bash
  winget install yt-dlp
  ```
- On Linux:
  ```bash
  sudo apt install yt-dlp   # For Ubuntu/Debian
  sudo dnf install yt-dlp   # For Fedora
  ```
- Using Python (all platforms):
  ```bash
  pip3 install yt-dlp
  ```

## Installation

1. Clone this repository:
```bash
git clone https://github.com/luizfranzon/twitter-video-downloader.git
cd twitter-video-downloader/web
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Built With

* [Next.js](https://nextjs.org/) - The React framework
* [Tailwind CSS](https://tailwindcss.com/) - For styling
* [yt-dlp](https://github.com/yt-dlp/yt-dlp) - For video downloading

## Usage

1. Open the application in your browser
2. Paste a Twitter/X or YouTube video link
3. Click the Download button
4. Wait for the video to start downloading

## Notes

- Make sure yt-dlp is properly installed and accessible from your system's PATH
- Some videos might be restricted or unavailable for download
- Please respect copyright and terms of service of the platforms

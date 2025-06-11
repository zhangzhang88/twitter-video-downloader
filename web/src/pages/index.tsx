import { useState } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [videoLink, setVideoLink] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoInfo, setVideoInfo] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVideoInfo(null);

    try {
      const response = await fetch('/api/video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ videoLink }),
      });

      const data = await response.json();

      if (!data.found) {
        throw new Error(data.error || 'Failed to get video');
      }

      setVideoInfo(data.media[0]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Twitter Video Downloader</title>
        <meta name="description" content="Download videos from Twitter/X with just one click" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.center}>
          <h1 className={styles.title}>
            Twitter Video Downloader
          </h1>
          <p className={styles.description}>
            Download videos from Twitter/X with just one click
          </p>
          <form onSubmit={handleSubmit} className={styles.form}>
            <input
              type="text"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Paste Twitter/X video link here..."
              className={styles.input}
            />
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? 'Loading...' : 'Download'}
            </button>
          </form>
          {error && <div className={styles.error}>{error}</div>}
          {videoInfo && (
            <div className={styles.videoContainer}>
              <h3>{videoInfo.title}</h3>
              {videoInfo.needsProxy ? (
                <video 
                  controls 
                  className={styles.video}
                  key={videoInfo.url}
                >
                  <source src={`/api/proxy?url=${encodeURIComponent(videoInfo.url)}`} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <a 
                  href={videoInfo.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.downloadLink}
                >
                  Download Video
                </a>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}

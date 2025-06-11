import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { videoLink } = req.body;
    
    if (!videoLink) {
      return res.status(400).json({ found: false, error: "No video link provided" });
    }

    // 验证是否是 Twitter/X 链接
    if (!videoLink.includes('twitter.com') && !videoLink.includes('x.com')) {
      return res.status(400).json({ 
        found: false, 
        error: "Invalid link. Please provide a Twitter/X video link" 
      });
    }

    // Twitter视频下载命令
    const command = `yt-dlp "${videoLink}" --no-check-certificates --no-warnings -f "best[ext=mp4]" --get-url --get-title`;

    console.log('Executing command:', command);

    const { stdout, stderr } = await execAsync(command);
    
    console.log('Command stdout:', stdout);
    if (stderr) {
      console.error('Command stderr:', stderr);
    }

    // yt-dlp 输出格式：第一行是标题，第二行是URL
    const [title, ...urls] = stdout.trim().split('\n');
    const videoUrl = urls[0];

    console.log('Video title:', title);
    console.log('Video URL:', videoUrl);

    if (!videoUrl) {
      console.error('No video URL found in output');
      throw new Error('No video URL found');
    }

    // 返回视频信息，包括标题
    return res.status(200).json({
      found: true,
      media: [{
        url: videoUrl,
        type: "video",
        title: title || "Twitter Video",
        needsProxy: true
      }]
    });
  } catch (error) {
    console.error("Error details:", error);
    return res.status(500).json({ 
      found: false, 
      error: "Failed to get video",
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

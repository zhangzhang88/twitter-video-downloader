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

    // 使用 -f best 参数来获取最佳质量的视频，并使用 -g 参数只获取视频 URL
    const command = `python3 -m yt_dlp "${videoLink}" -f best -g`;
    console.log('Executing command:', command);

    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Command stderr:', stderr);
    }

    // yt-dlp -g 输出的是直接的视频 URL
    const videoUrl = stdout.trim();

    if (!videoUrl) {
      throw new Error('No video URL found');
    }

    return res.status(200).json({
      found: true,
      media: [{
        url: videoUrl,
        type: "video"
      }]
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ 
      found: false, 
      error: "Failed to get video",
      details: error instanceof Error ? error.message : String(error)
    });
  }
}

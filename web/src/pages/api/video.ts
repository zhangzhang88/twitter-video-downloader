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

    // 使用更好的参数组合来下载视频
    const command = `yt-dlp "${videoLink}" -f "bv*+ba/b" --no-check-certificates --no-warnings -g`;
    console.log('Executing command:', command);

    const { stdout, stderr } = await execAsync(command);
    
    if (stderr) {
      console.error('Command stderr:', stderr);
    }

    // yt-dlp -g 可能会输出两个URL（视频和音频），我们取第一个
    const urls = stdout.trim().split('\n');
    const videoUrl = urls[0];

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

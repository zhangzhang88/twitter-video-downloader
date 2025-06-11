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

    // 根据链接类型使用不同的下载参数
    let command;
    if (videoLink.includes('youtube.com') || videoLink.includes('youtu.be')) {
      // YouTube视频使用基本参数
      command = `yt-dlp "${videoLink}" -f "b" --no-check-certificates --no-warnings --get-url --get-title`;
    } else if (videoLink.includes('twitter.com') || videoLink.includes('x.com')) {
      // Twitter视频使用特定参数，获取标题和URL
      command = `yt-dlp "${videoLink}" --no-check-certificates --no-warnings -f "best[ext=mp4]" --get-url --get-title`;
    } else {
      // 其他视频使用默认参数
      command = `yt-dlp "${videoLink}" -f "bv*+ba/b" --no-check-certificates --no-warnings --get-url --get-title`;
    }

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
        title: title || "Video",
        needsProxy: true // 添加这个标志来告诉前端使用代理播放
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

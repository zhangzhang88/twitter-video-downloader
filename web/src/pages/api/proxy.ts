import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'URL parameter is required' });
  }

  try {
    const response = await axios({
      method: 'GET',
      url: url,
      responseType: 'stream',
    });

    // 设置正确的内容类型
    res.setHeader('Content-Type', 'video/mp4');
    
    // 设置允许范围请求
    res.setHeader('Accept-Ranges', 'bytes');
    
    // 如果有Content-Length，也转发它
    if (response.headers['content-length']) {
      res.setHeader('Content-Length', response.headers['content-length']);
    }

    // 转发视频流
    response.data.pipe(res);
  } catch (error) {
    console.error('Proxy error:', error);
    res.status(500).json({ error: 'Failed to proxy video' });
  }
} 
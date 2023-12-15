const axios = require('axios');
const Media = require('../models/Media.js');

async function fetchAndSaveInstagramMedia(req, res) {
  try {
    const instagramApiEndpoint = 'https://graph.instagram.com/v12.0/me/media';
    const accessToken = 'IGQWROQS1DZA3EtWmk1clRsVDRQMm9LdVFzOS1ZAektyWjBTMHJObWtZAZAmwwdUQ2MTVOU2l0OTNVc1hIeUpZAZA3lXY1VyMHBNNTRTWFd4a2MtRnVBQ0RrUWlvSEMyOXBYSlI4TExjZAXBHN0J5b1hENmFpMFhaTHBDYWsZD';

    const response = await axios.get(`${instagramApiEndpoint}?fields=id,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=${accessToken}`);
    const mediaData = response.data.data;

    for (const data of mediaData) {
      const instagramMedia = new Media(data);
      await instagramMedia.save();
    }

    res.json({ success: true, message: 'Instagram media fetched and saved to MongoDB' });
  } catch (error) {
    console.error('Error fetching Instagram media:', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
}

module.exports = {
  fetchAndSaveInstagramMedia,
};

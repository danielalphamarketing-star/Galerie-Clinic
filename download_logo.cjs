const https = require('https');
const fs = require('fs');

if (!fs.existsSync('public')) {
  fs.mkdirSync('public');
}

const dest = 'public/WhatsApp Image 2026-03-10 at 09.07.38 (2).jpeg';
const file = fs.createWriteStream(dest);
const url = 'https://drive.google.com/uc?export=download&id=1Zi7tgtJItO9RU8rjPbxZVivocMVXXS9m';

function download(url) {
  https.get(url, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      download(res.headers.location);
    } else {
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log('Downloaded successfully');
      });
    }
  }).on('error', (err) => {
    fs.unlink(dest, () => {});
    console.error('Error downloading:', err.message);
  });
}

download(url);

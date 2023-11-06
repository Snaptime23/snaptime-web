const videos = [
  // 'https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  // 'https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4#t=0.01',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4#t=0.01',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4#t=0.01',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4#t=0.01',
  'https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4#t=0.01',
  // 'https://storage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
  // 'https://storage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
  'https://test-videos.co.uk/vids/jellyfish/mp4/h264/1080/Jellyfish_1080_10s_1MB.mp4#t=0.01',
];

function getRandomVideo() {
  return videos[Math.floor(Math.random() * videos.length)];
}

export { getRandomVideo };

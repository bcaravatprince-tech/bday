# Videos Folder

Place your video files here (mp4, webm, etc.).

## How to add a new video:

1. Copy your video file into this folder: `public/assets/videos/your-video.mp4`
2. (Optional) Copy a thumbnail image into: `public/assets/images/your-thumb.jpg`
3. Open `src/App.tsx` and find the `videos` array in the DEFAULTS object.
4. Add a new entry like this:

```js
{
  id: 'video-3',
  title: 'Your Video Title',
  src: '/assets/videos/your-video.mp4',
  thumbnail: '/assets/images/your-thumb.jpg',  // optional, remove if no thumbnail
}
```

5. Save the file. The video will appear in the gallery automatically.

Note: The path starts with `/assets/` because Vite serves the `public/` folder at the root.

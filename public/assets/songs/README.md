# Songs Folder

Place your audio files here (mp3, wav, ogg, etc.).

## How to add a new song:

1. Copy your audio file into this folder: `public/assets/songs/your-song.mp3`
2. (Optional) Copy a cover image into: `public/assets/images/your-cover.jpg`
3. Open `src/App.tsx` and find the `songs` array in the DEFAULTS object.
4. Add a new entry like this:

```js
{
  id: 'song-4',
  title: 'Your Song Title',
  artist: 'Artist Name',
  src: '/assets/songs/your-song.mp3',
  cover: '/assets/images/your-cover.jpg',  // optional, remove if no cover
}
```

5. Save the file. The song will appear in the music player automatically.

Note: The path starts with `/assets/` because Vite serves the `public/` folder at the root.

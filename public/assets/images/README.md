# Images Folder

Place your photo and cover images here (jpg, png, webp, etc.).

## How to add photos to the gallery:

1. Copy your image into this folder: `public/assets/images/your-photo.jpg`
2. Open `src/App.tsx` and find the `photos` array in the DEFAULTS object.
3. Add a new entry like this:

```js
{
  id: 'photo-3',
  src: '/assets/images/your-photo.jpg',
  caption: 'A lovely day at the park',
}
```

4. Save the file. The photo will appear in the gallery automatically.

## How to add song cover images or video thumbnails:

Song covers and video thumbnails also go in this folder.
See `public/assets/songs/README.md` and `public/assets/videos/README.md` for instructions.

Note: The path starts with `/assets/` because Vite serves the `public/` folder at the root.

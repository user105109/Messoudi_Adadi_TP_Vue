# Sonic – Spotify-inspired music player (Vue 3)

University project: a music streaming site built with Vue 3 (Composition API, `<script setup>`),
Vue Router, the Fetch API, plain CSS and the free Apple iTunes Search API (no key needed).

## How to run
1. Install Node.js 18 or newer.
2. In this folder run:
   ```
   npm install
   npm run dev
   ```
3. Open the address shown in the terminal (usually http://localhost:5173).

`npm run build` creates a production version in `dist/`.

## Project structure
```
src/
  main.js                  creates the Vue app, adds the router and the CSS
  App.vue                  page layout: sidebar + current page + player bar
  router/index.js          routes: / (Home), /search, /favorites, 404
  services/itunes.js       fetch() calls to the iTunes API, cleans up results
  composables/
    usePlayer.js           one shared <audio> element + play/pause/next/seek/volume
    useFavorites.js        favorites list saved in localStorage
    format.js              turns seconds into m:ss
  components/
    AppSidebar.vue         navigation links (RouterLink)
    TrackCard.vue          one song: cover, title, artist, play, favorite, Apple Music link
    TrackGrid.vue          grid of TrackCards
    AlbumCard.vue          one album, links to Apple Music
    PlayerBar.vue          fixed bottom player: track info, controls, progress, volume
    StatusMessage.vue      loading spinner / error / empty message
    AppFooter.vue          Apple attribution text
  views/
    HomeView.vue           popular songs + suggested albums
    SearchView.vue         search box with debounce, results, empty & error states
    FavoritesView.vue      saved songs
    NotFoundView.vue       unknown URL
  assets/main.css          all styles (dark theme, responsive rules)
```

## How it works
- **API service**: `searchSongs()` calls `https://itunes.apple.com/search?term=...&entity=song`
  and maps each result to `{ id, title, artist, album, artwork, previewUrl, trackUrl }`.
- **Shared state**: the `ref`s in `usePlayer.js` and `useFavorites.js` are created *outside*
  the exported function, so every component that uses them sees the same data.
  This is a simple alternative to Pinia.
- **Audio**: one `new Audio()` object plays the 30-second `previewUrl`. Its events
  (`timeupdate`, `play`, `pause`, `ended`, `error`) update the refs, and the player bar reacts.
- **Missing previews**: songs without `previewUrl` show a "No preview" badge. Next/previous skip them.
  Loading errors appear in the player bar.
- **Favorites**: a `watch` saves the list to `localStorage` every time it changes.
- **Search**: `watch(query)` waits 400 ms after typing stops and keeps the term in the URL (`?q=`).

## Attribution
Data, artwork and previews come from Apple's iTunes Search API. Each song links to Apple Music,
and the footer credits Apple, as Apple's terms for promotional content require.

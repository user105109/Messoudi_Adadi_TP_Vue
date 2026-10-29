// Small service that talks to the free Apple iTunes Search API.
// Docs: https://performance-partners.apple.com/search-api
const BASE_URL = 'https://itunes.apple.com/search'

// Turn a raw iTunes result into a clean object used by the whole app.
function toTrack(item) {
  return {
    id: item.trackId,
    title: item.trackName,
    artist: item.artistName,
    album: item.collectionName,
    artwork: (item.artworkUrl100 || '').replace('100x100', '400x400'),
    previewUrl: item.previewUrl || null, // may be missing!
    trackUrl: item.trackViewUrl, // link to Apple Music / iTunes
    duration: item.trackTimeMillis || 0,
  }
}

function toAlbum(item) {
  return {
    id: item.collectionId,
    title: item.collectionName,
    artist: item.artistName,
    artwork: (item.artworkUrl100 || '').replace('100x100', '400x400'),
    url: item.collectionViewUrl,
  }
}

async function request(params) {
  const url = `${BASE_URL}?${new URLSearchParams(params)}`
  const response = await fetch(url)
  if (!response.ok) throw new Error(`iTunes API error (${response.status})`)
  const data = await response.json()
  return data.results || []
}

export async function searchSongs(term, limit = 20) {
  const results = await request({ term, entity: 'song', media: 'music', limit })
  return results.filter((r) => r.trackId).map(toTrack)
}

export async function searchAlbums(term, limit = 10) {
  const results = await request({ term, entity: 'album', media: 'music', limit })
  return results.filter((r) => r.collectionId).map(toAlbum)
}

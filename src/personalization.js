export function detectAudienceSource() {
  try {
    const url = new URL(window.location.href)
    const params = url.searchParams
    const ref = document.referrer || ''
    const src = (params.get('utm_source') || '').toLowerCase()
    const med = (params.get('utm_medium') || '').toLowerCase()
    const aud = (params.get('aud') || params.get('audience') || '').toLowerCase()
    const host = ref ? new URL(ref).hostname.toLowerCase() : ''

    if (aud === 'music' || ['spotify.com','music.apple.com','soundcloud.com','bandcamp.com','youtube.com','music.youtube.com'].some(h => host.includes(h)) || ['spotify','apple_music','soundcloud','bandcamp','youtube','music'].includes(src)) return 'music'
    if (src === 'linkedin' || host.includes('linkedin.com')) return 'linkedin'
    if (med === 'email' || ['mail.google.com','outlook.live.com','outlook.office.com','mail.yahoo.com','proton.me','icloud.com'].some(h => host.includes(h))) return 'email'
    if (['google.','bing.com','duckduckgo.com','yahoo.com','ecosia.org','brave.com'].some(h => host.includes(h))) return 'search'
    return 'direct'
  } catch {
    return 'direct'
  }
}

export function pickInitialOutcomeIndex(outcomes) {
  const src = detectAudienceSource()
  const map = {
    linkedin: 0,
    search: 2,
    email: 3,
    music: 6,
    direct: 0,
  }
  const idx = map[src] ?? 0
  return Math.min(Math.max(idx, 0), outcomes.length - 1)
}


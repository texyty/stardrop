import crypto from 'crypto'

const STEAM_OPENID = 'https://steamcommunity.com/openid/login'
const SESSION_TTL = 1000 * 60 * 60 * 24 * 7

function b64url(buf) {
  return Buffer.from(buf).toString('base64url')
}

function sign(payloadB64, secret) {
  return crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url')
}

function makeToken(profile, secret) {
  const payload = { ...profile, iat: Date.now(), exp: Date.now() + SESSION_TTL }
  const payloadB64 = b64url(JSON.stringify(payload))
  return `${payloadB64}.${sign(payloadB64, secret)}`
}

function pickOrigin(req) {
  const host = req.headers['x-forwarded-host'] || req.headers.host
  const proto = req.headers['x-forwarded-proto'] || 'https'
  return `${proto}://${host}`
}

function redirectToSteam(res, origin) {
  const params = new URLSearchParams({
    'openid.ns': 'http://specs.openid.net/auth/2.0',
    'openid.mode': 'checkid_setup',
    'openid.return_to': `${origin}/api/auth/steam`,
    'openid.realm': origin,
    'openid.identity': 'http://specs.openid.net/auth/2.0/identifier_select',
    'openid.claimed_id': 'http://specs.openid.net/auth/2.0/identifier_select'
  })
  res.writeHead(302, { Location: `${STEAM_OPENID}?${params}` })
  res.end()
}

async function validateOpenIdCallback(searchParams) {
  const check = new URLSearchParams()
  for (const [key, value] of searchParams) {
    if (key.startsWith('openid.')) check.set(key, value)
  }
  check.set('openid.mode', 'check_authentication')
  const response = await fetch(`${STEAM_OPENID}?${check}`)
  const text = await response.text()
  return text.includes('is_valid:true')
}

async function loadProfile(steamId) {
  const key = process.env.STEAM_API_KEY
  if (!key) {
    return {
      username: `Steam ${steamId.slice(-4)}`,
      steamId,
      avatar: '',
      isSteam: true
    }
  }
  try {
    const response = await fetch(
      `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${key}&steamids=${steamId}`
    )
    const data = await response.json()
    const player = data?.response?.players?.[0]
    return {
      username: player?.personaname || `Steam ${steamId.slice(-4)}`,
      steamId,
      avatar: player?.avatarfull || '',
      isSteam: true
    }
  } catch (err) {
    return {
      username: `Steam ${steamId.slice(-4)}`,
      steamId,
      avatar: '',
      isSteam: true
    }
  }
}

export default async function handler(req, res) {
  const origin = pickOrigin(req)
  const url = new URL(req.url, origin)
  const params = url.searchParams

  if (!params.has('openid.claimed_id')) {
    return redirectToSteam(res, origin)
  }

  const isValid = await validateOpenIdCallback(params)
  if (!isValid) {
    res.writeHead(302, { Location: '/signin?steam=failed' })
    return res.end()
  }

  const match = String(params.get('openid.claimed_id') || '').match(/steamcommunity\.com\/openid\/id\/(\d+)$/)
  if (!match) {
    res.writeHead(302, { Location: '/signin?steam=failed' })
    return res.end()
  }

  const profile = await loadProfile(match[1])
  const secret = process.env.STEAM_AUTH_SECRET || 'starlight-dev-secret-change-me'
  const token = makeToken(profile, secret)

  res.writeHead(302, { Location: `/?session=${encodeURIComponent(token)}` })
  res.end()
}

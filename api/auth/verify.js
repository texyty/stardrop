import crypto from 'crypto'

function verifyToken(token) {
  const secret = process.env.STEAM_AUTH_SECRET || 'starlight-dev-secret-change-me'
  const dotIndex = token.indexOf('.')
  if (dotIndex === -1) return null

  const payloadB64 = token.slice(0, dotIndex)
  const sig = token.slice(dotIndex + 1)

  const expected = crypto.createHmac('sha256', secret).update(payloadB64).digest('base64url')
  const sigBuf = Buffer.from(sig)
  const expBuf = Buffer.from(expected)
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) {
    return null
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadB64, 'base64url').toString('utf8'))
    if (typeof payload.exp !== 'number' || payload.exp < Date.now()) return null
    return payload
  } catch (err) {
    return null
  }
}

export default function handler(req, res) {
  const url = new URL(req.url, `https://${req.headers['x-forwarded-host'] || req.headers.host}`)
  const session = url.searchParams.get('session') || ''

  const profile = verifyToken(session)
  if (!profile) {
    res.writeHead(401, { 'Content-Type': 'application/json' })
    return res.end(JSON.stringify({ error: 'invalid session' }))
  }

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({
    profile: {
      username: profile.username,
      steamId: profile.steamId,
      avatar: profile.avatar,
      isSteam: profile.isSteam
    }
  }))
}

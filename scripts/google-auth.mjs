// One-time helper: gets a Google refresh token for the call booking system.
// Usage: node --env-file=.env.local scripts/google-auth.mjs
// Saves GOOGLE_REFRESH_TOKEN into .env.local.
import http from 'node:http';
import fs from 'node:fs';

const { GOOGLE_CLIENT_ID: clientId, GOOGLE_CLIENT_SECRET: clientSecret } = process.env;
if (!clientId || !clientSecret) {
  console.error('Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET first.');
  process.exit(1);
}

const PORT = 5555;
const redirectUri = `http://localhost:${PORT}/callback`;
const scopes = [
  'https://www.googleapis.com/auth/calendar.events',
  'https://www.googleapis.com/auth/calendar.freebusy',
];

const authUrl = 'https://accounts.google.com/o/oauth2/v2/auth?' + new URLSearchParams({
  client_id: clientId,
  redirect_uri: redirectUri,
  response_type: 'code',
  scope: scopes.join(' '),
  access_type: 'offline',
  prompt: 'consent',
});

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, redirectUri);
  if (url.pathname !== '/callback') { res.writeHead(404).end(); return; }
  const code = url.searchParams.get('code');
  if (!code) { res.end(`No code: ${url.searchParams.get('error')}`); return; }

  const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: clientId, client_secret: clientSecret, redirect_uri: redirectUri, grant_type: 'authorization_code' }),
  });
  const data = await tokenRes.json();

  if (!data.refresh_token) {
    res.end('No refresh token returned. Check the terminal.');
    console.error(data);
  } else {
    // Write straight into .env.local so the token is never printed
    const envPath = new URL('../.env.local', import.meta.url);
    const env = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf8') : '';
    const line = `GOOGLE_REFRESH_TOKEN=${data.refresh_token}`;
    fs.writeFileSync(envPath, /^GOOGLE_REFRESH_TOKEN=.*$/m.test(env)
      ? env.replace(/^GOOGLE_REFRESH_TOKEN=.*$/m, line)
      : env.replace(/\n*$/, '\n') + line + '\n');
    res.end('Done. Calendar connected. You can close this tab.');
    console.log('Saved GOOGLE_REFRESH_TOKEN to .env.local');
  }
  server.close();
});

server.listen(PORT, () => {
  console.log('Open this URL and approve access with the Google account whose calendar should take bookings:\n');
  console.log(authUrl + '\n');
});

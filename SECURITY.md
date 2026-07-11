# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in Boilerworks, please report it responsibly.

**Do not open a public issue.**

Instead, email **security@weareconflict.com** with:

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

We will acknowledge your report within 48 hours and aim to release a fix within 7 days for critical issues.

## Supported Versions

| Version | Supported |
| ------- | --------- |
| latest  | Yes       |

## Security Best Practices

When deploying a site built from this template:

- Never commit secrets (API keys, tokens) to the repository -- this is a
  static site; anything in the build output is public
- Use HTTPS in production (Cloudflare Pages provides this by default)
- Set security headers (`Content-Security-Policy`, `X-Content-Type-Options`,
  `Referrer-Policy`) via your host, e.g. a `_headers` file on Cloudflare Pages
- Keep dependencies current -- CI runs `npm audit --audit-level=high`
- If you enable SSR routes, validate and sanitize all query/form input

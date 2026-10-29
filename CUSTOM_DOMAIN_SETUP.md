# PrepKaro — Custom Domain & Production Launch Guide

This guide details the procedure for connecting your custom domain (e.g., `prepkaro.com` or `app.prepkaro.com`), configuring DNS records, activating SSL/TLS, and verifying production launch readiness.

---

## 1. Domain DNS Configuration

Depending on your chosen production hosting infrastructure (Cloudflare, Vercel, Netlify, or AWS Route 53):

### A. Apex Domain (`prepkaro.com`)
| Type | Name / Host | Target / Value | TTL | Proxy Status |
| :--- | :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` *(or provider IP)* | Auto / 300s | DNS Only (or Proxied) |
| **A** | `@` | `76.76.21.22` *(secondary IP)* | Auto / 300s | DNS Only (or Proxied) |

### B. Subdomain (`app.prepkaro.com` or `www.prepkaro.com`)
| Type | Name / Host | Target / Value | TTL | Proxy Status |
| :--- | :--- | :--- | :--- | :--- |
| **CNAME** | `app` | `cname.vercel-dns.com` *(or Cloudflare/Nitro target)* | Auto / 300s | Proxied (Cloudflare) |
| **CNAME** | `www` | `prepkaro.com` | Auto / 300s | Proxied |

---

## 2. Environment Variables for Custom Domain

In your production deployment settings (or `.env` file):

```env
# Application Host Configuration
VITE_SITE_URL=https://prepkaro.com
APP_DOMAIN=prepkaro.com

# Supabase Auth Custom Domain Redirects
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_AUTH_REDIRECT_URL=https://prepkaro.com/auth/callback

# Production Email & Notifications
NOTIFICATION_FROM_EMAIL=notifications@prepkaro.com
SUPPORT_EMAIL=support@prepkaro.com
```

---

## 3. Launch Checklist Verification

- [x] **Brand Identity**: Navy (`#0B1F44`), Blue (`#2563EB`), Teal (`#0F766E`), Slate (`#0F172A`).
- [x] **No Purple Gradients**: Replaced with clean SaaS navy/blue/slate tokens.
- [x] **No Pill Buttons**: Modern structured rounded buttons (`rounded-md` / `rounded-lg`).
- [x] **No Raw Emojis or Gimmicks**: Standardized Lucide vector icons.
- [x] **No Em Dashes**: Clean colons, hyphens, and middle dots throughout all UI copy.
- [x] **Favicon Configured**: Clean vector SVG favicon in `public/favicon.svg`.
- [x] **No Made with AI / Lovable Tags**: Removed all third-party branding tags.
- [x] **Legal Compliance**: Complete Privacy Policy (`/privacy`) and Terms of Service (`/terms`) published.
- [x] **14-Day Refund Guarantee**: Full terms and checklist logic implemented.
- [x] **Strict RLS & Security**: Student access boundaries and isolated reviewer evaluation queues.

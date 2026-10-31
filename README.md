# Webinar registration site + admin dashboard

| File | What it is |
|---|---|
| `index.html` | Public registration page for the free webinar |
| `feedback.html` | Post-webinar survey (6 questions) and starter-workshop waitlist. Share this link at the end of the webinar |
| `workshop.html` | Starter workshop page (₹299/₹399). The button is controlled by `config.js` |
| `terms.html`, `refund.html`, `privacy.html` | Policy pages. **Drafts**: review the [bracketed] items and remove the draft banner before taking payments |
| `admin.html` | Admin dashboard: interest signals (survey, funnel, Go/Adjust/Stop bands) plus registrations |
| `Code.gs` | Google Apps Script backend: stores registrations and survey responses in a Google Sheet |
| `config.js` | Backend URL, workshop status, payment link, contact email. Leave `API_URL` empty to try the site in demo mode |
| `api.js`, `site.js`, `styles.css` | Shared code and styling |

## 1. Create the backend (about 5 minutes)

1. Create a new Google Sheet, for example "Webinar registrations".
2. In the sheet, open **Extensions → Apps Script**. Delete the sample code, paste in all of `Code.gs`, and save.
3. Set your admin password: **Project Settings (gear icon) → Script properties → Add script property**. Name: `ADMIN_KEY`. Value: a long password only you know.
4. Choose **Deploy → New deployment → Select type: Web app**, then set:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**, authorize when prompted, and copy the **Web app URL** (it ends in `/exec`).
6. Paste that URL into `config.js`:
   ```js
   window.APP_CONFIG = { API_URL: "https://script.google.com/macros/s/XXXX/exec" };
   ```

Registrations appear as rows in the **Registrations** tab and survey answers in the **Survey** tab. The script creates each tab on its first submission.

If you change `Code.gs` later, use **Deploy → Manage deployments → Edit → Version: New version** so the URL stays the same.

## 2. Host the site (free)

Upload these files together to any static host:

- **Netlify Drop**: drag the folder onto https://app.netlify.com/drop
- **GitHub Pages**: push the files to a repository, then turn on Pages
- **Cloudflare Pages** or **Vercel**: also work

Share `https://your-site/` with faculty. Open `https://your-site/admin.html` yourself and sign in with your `ADMIN_KEY`.

## 3. Starter workshop and payments

Settings live in `config.js`:

| Setting | What it does |
|---|---|
| `WORKSHOP_STATUS` | `"soon"`: button reads "Registration opens soon". `"open"`: shows the pay button. `"closed"`: registration closed |
| `PAY_URL` | The public ₹399 Razorpay Payment Page link (starts with `https://`). Keep the ₹299 attendee link out of the site; share it in WhatsApp and the follow-up email |
| `CONTACT_EMAIL` | Shown on the workshop and policy pages |

Razorpay Payment Pages collect the buyer's name, email and phone and keep the payment record. Match paid buyers to the waitlist by email, then type the paid-seat count and the live-attendee count (from the Meet report) into the admin dashboard to see the Go / Adjust / Stop bands.

## Look and feel

The public pages load `styles.css` and then `brand.css`, which sets the editorial dark theme (redesigned 31 Oct 2026 from `design.md`: Instrument Serif headlines, Inter body text, champagne-gold accents, hairline borders). `site.js` adds the scroll progress bar, the header border on scroll and the fade-in of sections. `admin.html` loads only `styles.css`.

Earlier themes are kept for switching back: `brand-gold-v1.css` (previous black-and-gold) and `brand-navy.css` (navy). Copy either over `brand.css`. The pre-redesign pages are in `_backup_2026-10-31`.

## Notes

- Registering twice with the same email does not create a second row. A second survey response from the same email replaces the first.
- Joining the waitlist needs its own consent tick, separate from the survey.
- A hidden honeypot field filters out simple spam bots.
- The admin key is checked on the server. Without it, the dashboard shows no data. Anyone who has the key can read every registration, so keep it private.
- Demo mode (empty `API_URL`) stores registrations only in your own browser. On `admin.html`, any key works, and the **Add sample data** button fills the dashboard with test registrations and survey responses.

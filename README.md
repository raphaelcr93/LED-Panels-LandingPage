# OpenAir Pixels Landing Page

Static pre-launch validation landing page for **OpenAir Pixels**, a proposed Australian business selling premium outdoor LED screen walls for residential backyards, pool areas, patios, pergolas, alfresco kitchens, luxury homes and short-stay properties.

The site uses plain HTML, CSS and vanilla JavaScript only. There is no build step, framework, backend or database.

The image assets and animated concept reels are AI-generated previews. They are not real project videos or completed installations.

## Files

- `index.html` - page structure, copy and static email form
- `outdoor-led-walls.html` - residential outdoor LED wall guide
- `backyard-sports-wall.html` - Backyard Sports Wall concept page
- `poolside-cinema-wall.html` - Poolside Cinema Wall concept page
- `short-stay-led-wall.html` - Architectural LED Feature Wall concept page
- `styles.css` - responsive premium dark visual design, motion previews and animation system
- `script.js` - mobile menu, smooth scroll, validation, animated pixels, cursor LED tray, reveal effects and mailto fallback behaviour
- `assets/hero-backyard-led-wall.png` - generated hero concept image
- `assets/alfresco-sports-wall.png` - generated alfresco sport concept image
- `assets/poolside-cinema-wall.png` - generated poolside cinema concept image
- `assets/short-stay-feature-wall.png` - generated luxury short-stay concept image
- `README.md` - project notes and deployment instructions

## Run Locally

Open `index.html` directly in a browser.

You can also serve the folder with any simple static server, but it is not required.

## Deploy To GitHub Pages

1. Push these files to a GitHub repository.
2. In GitHub, open **Settings**.
3. Go to **Pages**.
4. Set the source to the branch and folder containing `index.html`.
5. Save and wait for GitHub Pages to publish the site.

Because all paths are relative and there is no build step, the page works on GitHub Pages as-is.

## Contact Form Email

The contact form in `index.html` is currently wired to send submissions to:

```text
openair.pixels@outlook.com
```

It uses a static form endpoint:

```html
https://formsubmit.co/openair.pixels@outlook.com
```

Before relying on it for leads:

1. Deploy the site or open it locally.
2. Submit one test enquiry.
3. Confirm the activation email sent by FormSubmit to `openair.pixels@outlook.com`.
4. Submit another test enquiry and confirm it arrives in the inbox.

The form includes a hidden field:

```html
lead_source = OpenAir Pixels landing page
```

A fallback email link is included for `openair.pixels@outlook.com`.

## Email Delivery And SMTP

Do not put SMTP usernames, passwords or API keys in `script.js` or any other static file. GitHub Pages serves files directly to the browser, which means visitors can inspect the JavaScript and see any hardcoded credentials.

For this static validation site, the safest simple options are:

- **FormSubmit**: currently implemented. It can email submissions from a static HTML form after the recipient confirms activation.
- **Web3Forms**: another static-form option. Create an access key, then replace the form action and add the key as a hidden field.
- **Formspree**: also suitable for GitHub Pages if you prefer a dashboard and managed form ID.
- **EmailJS**: can trigger predefined email templates from client-side JavaScript, but it still requires configuring an email service, template and public key in the EmailJS dashboard.
- **A serverless function**: use Cloudflare Workers, Netlify Functions, Vercel Functions or AWS Lambda to receive the form submission and send email through Resend, SendGrid, Mailgun or SMTP. Store credentials as environment variables.
- **A small backend**: host a tiny API endpoint on a server you control and keep SMTP credentials on the server only.
- **Mailto fallback**: already included, but it relies on the visitor's email client and is not a reliable lead-capture system.

Outlook, Microsoft 365 and Gmail SMTP can be used from a backend or serverless function, not safely from this static frontend. Hardcoded SMTP in frontend JavaScript exposes mailbox credentials, allows abuse, and can get the sending account blocked.

## Change Business Details

Change the business name in:

- `index.html` page title, header, footer and copy
- `README.md` project description

Change the email address in:

- `index.html` form action and mailto links
- `script.js` generated mailto fallback
- `README.md` notes

Change pricing and package copy in:

- `index.html`, inside the `#packages` section
- `index.html`, inside the FAQ pricing answer
- The individual concept pages if the offer changes

## Suggested Next Validation Steps

- Buy the domain.
- Confirm the FormSubmit recipient email or connect Formspree.
- Add analytics.
- Run Google and Meta ads.
- Track quote requests.
- Test package pricing.
- Add real project photos later.
- Speak with electricians and installers before taking deposits.

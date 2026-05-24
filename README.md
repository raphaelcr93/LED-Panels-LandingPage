# OpenAir Pixels Landing Page

Static pre-launch validation landing page for **OpenAir Pixels**, a proposed Australian business selling premium outdoor LED screen walls for residential backyards, pool areas, patios, pergolas, alfresco kitchens, luxury homes and short-stay properties.

The site uses plain HTML, CSS and vanilla JavaScript only. There is no build step, framework, backend or database.

## Files

- `index.html` - page structure, copy and Formspree form
- `styles.css` - responsive premium dark visual design and CSS-only concept previews
- `script.js` - mobile menu, smooth scroll, validation and mailto fallback behaviour
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

## Connect Formspree

The contact form in `index.html` uses this placeholder action:

```html
https://formspree.io/f/YOUR_FORM_ID
```

To collect real leads:

1. Create a Formspree account.
2. Create a new form.
3. Copy the real Formspree form endpoint.
4. Replace `YOUR_FORM_ID` in `index.html` with the real ID.
5. Submit a test enquiry from the deployed site.

The form includes a hidden field:

```html
lead_source = OpenAir Pixels landing page
```

A fallback email link is included for `hello@openairpixels.com.au`.

## Change Business Details

Change the business name in:

- `index.html` page title, header, footer and copy
- `README.md` project description

Change the email address in:

- `index.html` mailto links
- `script.js` generated mailto fallback
- `README.md` notes

Change pricing and package copy in:

- `index.html`, inside the `#packages` section
- `index.html`, inside the FAQ pricing answer

## Suggested Next Validation Steps

- Buy the domain.
- Connect Formspree.
- Add analytics.
- Run Google and Meta ads.
- Track quote requests.
- Test package pricing.
- Add real project photos later.
- Speak with electricians and installers before taking deposits.

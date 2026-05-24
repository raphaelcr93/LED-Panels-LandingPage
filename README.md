# OpenAir Pixels Static Website

Static GitHub Pages website for **OpenAir Pixels**, a pre-launch Australian business validating demand for outdoor LED screen packages for residential backyards, patios, pergolas, BBQ areas, pool zones and alfresco entertaining.

The offer is package-based and practical:

- Resell outdoor-rated LED panels.
- Provide a basic but premium-looking installation.
- Include a black or dark powder-coated metallic structure.
- Include controller setup.
- Include optional or package-based outdoor audio.

The site uses plain HTML, CSS and vanilla JavaScript only. There is no build step, framework, backend or database.

## Page List

- `index.html` - focused homepage and primary sales path
- `packages.html` - package cards and comparison table
- `guide.html` - practical buyer guide
- `how-it-works.html` - educational package explainer
- `contact.html` - Web3Forms expression of interest form
- `thank-you.html` - Web3Forms redirect page
- `styles.css` - shared visual system and responsive layout
- `script.js` - mobile menu, active nav, same-page smooth scroll, form validation, loading state and mailto fallback

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

## Connect Web3Forms

The homepage form and contact page form post to:

```html
https://api.web3forms.com/submit
```

Current hidden fields in `index.html` and `contact.html`:

- `access_key = 81ef4d1c-cf3c-4e53-b86e-1385b343c070`
- `subject = New OpenAir Pixels Expression of Interest`
- `from_name = OpenAir Pixels website`
- `redirect = https://raphaelcr93.github.io/LED-Panels-LandingPage/thank-you.html`
- `botcheck` honeypot field
- `lead_source = OpenAir Pixels landing page` in `index.html`
- `lead_source = OpenAir Pixels static website` in `contact.html`

After deploying:

1. Submit one test enquiry.
2. Confirm the message arrives at the email configured in Web3Forms.
3. Confirm the browser redirects to `thank-you.html`.

## Change Business Details

Change the email address in:

- Web3Forms dashboard for the access key
- `index.html` and `contact.html` if the Web3Forms access key changes
- `index.html` and `contact.html` hidden `redirect` only if the GitHub Pages URL changes
- All `mailto:` links in the HTML pages
- `script.js` mailto fallback generation
- This README

Change package pricing in:

- `index.html` package preview section
- `packages.html` package cards
- `packages.html` package comparison table

Change package products in:

- `packages.html`
- `how-it-works.html`
- `contact.html` package-interest select field
- The internal cost model below

## Media Generation And Replacement

Generated and replacement media should be saved in:

```text
assets/media/
```

Prompt sources:

- `assets/media/IMAGE_GENERATION_PROMPTS.md`
- `assets/media/prompts.json`

Current required filenames:

- `hero-openair-plus-poolside.webp`
- `openair-compact-patio.webp`
- `openair-plus-poolside.webp`
- `openair-max-large-backyard.webp`
- `backyard-sports-night.webp`
- `outdoor-gaming-session.webp`
- `modular-led-panel-closeup.webp`
- `ip65-weather-cabinet.webp`
- `controller-av-cabinet.webp`
- `outdoor-audio-speakers.webp`
- `metal-frame-installation.webp`
- `led-wall-vs-projector.webp`

Recommended image sizes:

- 16:9 images: 1600 x 900 or larger
- 4:3 detail images: 1200 x 900 or larger
- Format: WebP for production

To replace an image:

1. Generate or source original/licensed media.
2. Export as WebP using the same filename.
3. Save it in `assets/media/`.
4. Keep the same aspect ratio to avoid layout shift.
5. Check that the image has no logos, real broadcasts, copyrighted game content, readable UI, fake certifications or watermarks.
6. Keep concept images labelled honestly as concept previews until real completed project photos are available.

The site uses reusable media components:

- `image-placeholder`
- `video-placeholder`
- `concept-media`
- `media-caption`
- `media-tag`
- `media-picture`

Images are loaded through `<picture>` elements with CSS fallback backgrounds underneath. If an image fails to load, JavaScript adds a fallback class so the polished abstract LED placeholder remains visible instead of a broken media frame.

AI-generated concept media can be used for pre-launch validation if it is clearly labelled as a concept preview and does not imply a completed installation. Use only original or licensed media. Do not use copyrighted photos or videos without permission.

## Internal Package Cost Model

Do not publish these internal costs on the customer-facing website.

### OpenAir Compact

- Screen: 2.5 m x 1.4 m, approx. 3.5 m2
- Panel: P5 IP65 outdoor LED
- Controller: Huidu HD-A6L
- Audio: audio-ready, optional Polk Atrium 6
- Structure: basic black powder-coated metallic frame
- Estimated cost price: AUD $13.6k
- Suggested sell price: AUD $19.9k to AUD $24.9k
- Estimated profit: AUD $6.3k to AUD $11.3k
- Estimated margin: 31 percent to 45 percent

### OpenAir Plus

- Screen: 3.5 m x 2.0 m, approx. 7.0 m2
- Panel: P4.81 or P4 IP65 outdoor LED
- Controller: Colorlight X4S
- Audio: Polk Atrium 6 plus basic amp allowance
- Structure: reinforced black powder-coated metallic frame
- Estimated cost price: AUD $27.7k
- Suggested sell price: AUD $34.9k to AUD $42.9k
- Estimated profit: AUD $7.2k to AUD $15.2k
- Estimated margin: 21 percent to 35 percent

### OpenAir Max

- Screen: 4.5 m x 2.5 m, approx. 11.25 m2
- Panel: P4 IP65 outdoor LED, P3.91 upgrade available
- Controller: NovaStar VX600
- Audio: Klipsch AW-650 plus better amp or AV allowance, optional Sonos Outdoor plus Sonos Amp upgrade
- Structure: heavy-duty black powder-coated metallic structure
- Estimated cost price: AUD $48.1k
- Suggested sell price: AUD $62.9k to AUD $79.9k
- Estimated profit: AUD $14.8k to AUD $31.8k
- Estimated margin: 24 percent to 40 percent

## Suggested Validation Steps

- Buy the domain.
- Confirm Web3Forms forwarding.
- Add analytics.
- Run Google and Meta ads.
- Track package interest and quote requests.
- Test Compact, Plus and Max pricing.
- Replace concept media with real project photos later.
- Speak with electricians and installers before taking deposits.

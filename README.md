# Little Genius Website

This is a static website project for Little Genius Play School.

## Structure

- `sections/` - contains the root HTML file, separate section fragments, CSS, JavaScript, and assets.
  - `little_genius_school.html` - root page that loads all section fragments.
  - `hero.html`, `highlights.html`, `counters.html`, `principal.html`, `academics.html`, `admissions.html`, `facilities.html`, `gallery.html`, `testimonials.html`, `news.html`, `contact.html`, `footer.html` - section fragments.
  - `style.css` - site stylesheet.
  - `script.js` - page behavior and interactivity.
  - `lg_logo.jpg` - logo image used as favicon and site branding.

## Usage

1. Open `sections/little_genius_school.html` in a browser.
2. The page loads all section fragments dynamically.
3. Edit each section file independently to update content.

## Notes

- Make sure the `lg_logo.jpg` file is present in the `sections/` folder for the favicon and logo images.
- If you want to deploy this as a static site, serve the `sections/` directory with any static web server.

# Gabriel Dorosh Portfolio

Source for [gabrieldorosh.com](https://gabrieldorosh.com), built with Astro and deployed to GitHub Pages.

See [the release review](RELEASE-REVIEW.md) for the completed audit, remaining hosting checks, and steps for replacing the existing site while preserving its repository history.

## Quick start

Use Node.js 24 LTS and npm, matching the publishing workflow. The minimum supported Node.js version is 22.19.

```powershell
npm ci
npm run dev -- --background
```

Astro prints the local address when the server starts. These commands manage the background server:

```powershell
npm run astro -- dev status
npm run astro -- dev logs
npm run astro -- dev stop
```

To test on a phone connected to the same Wi-Fi, expose the development server on your local network:

```powershell
npm run dev -- --host 0.0.0.0
```

Open the **Network** address Astro prints on your phone, using the port shown (normally `4321`). If Windows asks, allow Node.js through the firewall on private networks. Keep the terminal running while testing.

Before publishing, create and inspect a production build:

```powershell
npm run build
npm run preview
```

For a phone preview of the production build, use `npm run preview -- --host 0.0.0.0`.

## Everyday editing

Most changes only require editing one Astro or Markdown file.

| What you want to change | Where to edit it |
| --- | --- |
| Name, default description, email, social links, or CV path | `src/config/site.ts` |
| Home-page headline, introduction, buttons, or personal section | `src/pages/index.astro` |
| Home-page travel cards | `src/pages/index.astro` and `src/assets/travel/` |
| About-page biography and travel stories | `src/pages/about.astro` |
| Work-page introduction | `src/pages/projects/index.astro` |
| Project title, summary, technologies, links, and case-study copy | `src/content/projects/*.md` |
| CV-page introduction or preview images | `src/pages/cv.astro` |
| Navigation | `src/components/Header.astro` |
| Footer wording and links | `src/components/Footer.astro` |
| Shared page metadata | `src/layouts/BaseLayout.astro` |
| Colours, spacing, type, and responsive rules | `src/styles/global.css` |
| Hidden Gaming page | `src/pages/gaming.astro` |
| Predictive-analysis report page | `src/pages/projects/predictive-analysis/report.astro` |

Save a source file while the development server is running and Astro will refresh the page. Keep wording direct and factual; the strongest copy on this site names the project, decision, result, or limitation instead of relying on broad claims.

## Editing a project

Each case study is a Markdown file in `src/content/projects/`. The YAML block between the first two `---` lines controls how the project appears around the site; everything below it is the case-study body.

Useful fields:

- `title`, `shortTitle`, `summary`, and `seoDescription` control the visible and search-preview copy.
- `year`, `type`, `role`, and `technologies` describe the work.
- `cover` sets the main image. `homeCover` can provide a different image on Home.
- `coverFit` can be `cover` or `contain`.
- `order` controls the order on Work and in next-project links.
- `featured: true` makes the project eligible for Home. Home shows the first three featured projects by `order`.
- `listed: false` keeps the direct URL working, removes the project from Home, Work, and next-project links, and adds `noindex`. Also remove its URL from `public/sitemap.xml`.
- `draft: true` prevents the route from being built at all.
- `liveUrl`, `repoUrl`, `documentUrl`, and `phoneScreens` are optional.

The case-study body uses ordinary Markdown:

```md
## Section heading

- **Short label:** A concrete explanation of the decision or result.
```

Some visual evidence is defined outside Markdown:

- Predictive-analysis diagrams and pipeline labels are in `src/pages/projects/[slug].astro` and `src/components/PredictiveEvidence.astro`.
- The Portfolio and Niko's Nook galleries are configured in `src/pages/projects/[slug].astro`.

### Adding a project

1. Put its images in `src/assets/projects/`.
2. Copy an existing file in `src/content/projects/` and rename it to the new URL slug.
3. Add that filename to `projectFiles` in `src/content.config.ts`. Project discovery is intentionally explicit.
4. Give it a unique `order` and update its links and metadata.
5. Add the public URL to `public/sitemap.xml` if the project is listed.
6. Add a legacy redirect in `astro.config.mjs` only if an old URL needs to keep working.
7. Run `npm run build`.

When deleting a project, also remove its filename from `projectFiles`. Check `astro.config.mjs` for redirects that would otherwise point to a missing page.

## Updating the CV

The editable source is `cv/gabriel-dorosh-cv.tex`. The website uses the compiled PDF and two PNG previews, so all three public files must stay in sync.

1. Edit `cv/gabriel-dorosh-cv.tex`.
2. Compile it with Overleaf, Tectonic, TeX Live, or another LaTeX setup.
3. Replace `public/downloads/gabriel-dorosh-cv.pdf`.
4. Export each page at roughly 144 DPI and replace:
   - `public/downloads/gabriel-dorosh-cv-page-1.png`
   - `public/downloads/gabriel-dorosh-cv-page-2.png`
5. Keep the current 1191×1684 preview dimensions where practical. If the dimensions or page count change, update the image elements, introductory copy, and accessibility labels in `src/pages/cv.astro`.
6. Confirm the public PDF contains no phone number or other private information.
7. Run `npm run build`, then test both **Open PDF** and **Download PDF**.

The degree report works similarly: its PDF and preview images live in `public/downloads/`, while `src/pages/projects/predictive-analysis/report.astro` defines their order and dimensions.

## Images and public files

- Put images that Astro should optimise in `src/assets/` and import or reference them from source.
- Put files that must keep an exact filename in `public/`, including PDFs, preview PNGs, favicons, `CNAME`, and `og.png`.
- `src/assets/unused/` is deliberately ignored by Git. It contains private working photographs that are not needed by the deployed site.
- Update image alt text whenever an image changes.

The sitemap is maintained manually in `public/sitemap.xml`. Add or remove URLs whenever the public route list changes.

Changing the domain requires updates to `astro.config.mjs`, `src/config/site.ts`, `public/CNAME`, `public/robots.txt`, `public/sitemap.xml`, and the canonical URLs in the legacy HTML redirects under `public/`.

## Deploying to GitHub Pages

Deployment is defined in `.github/workflows/deploy.yml` and runs when `main` is pushed.

For the first deployment:

1. Commit the source files, `package.json`, `package-lock.json`, and `.github/workflows/deploy.yml` as the replacement repository contents.
2. In GitHub, open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Push `main`.
4. Open the repository's **Actions** tab and wait for **Deploy to GitHub Pages** to finish.
5. Confirm the custom domain is `gabrieldorosh.com` and HTTPS is enabled.

Do not commit generated or private working files:

- `node_modules/`
- `dist/`
- `.astro/`
- `tmp/`
- `.env` or `.env.production`
- `src/assets/unused/`
- local editor or tooling configuration

## Pre-deployment checklist

1. Run `npm run build` and resolve every error.
2. Check Home, Work, About, CV, every listed case study, and the degree report on desktop and mobile.
3. Check the real site in iOS Safari when changing borders, image crops, fixed navigation, or touch interactions.
4. Open every PDF and test every download button.
5. Review `public/sitemap.xml` and the project `listed`/`draft` fields.
6. Test email and social links, and search the repository for old usernames or contact details.
7. Make sure no placeholder copy, commented-out experiments, private photographs, or temporary files are included in the commit.
8. Push `main`, watch the deployment action, then check the live custom domain in a private browser window.

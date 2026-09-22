# Portfolio release review

Reviewed 14 September 2026. Scope: prepare this Astro portfolio for hiring teams and replacement of the existing GitHub Pages site. The existing public site has not been changed.

## Release decision

The source is prepared for publishing. Complete the GitHub Pages deployment and the short live-site checks below before sending the link. Use **https://gabrieldorosh.com/**; the existing `www` hostname currently has a TLS certificate mismatch.

## Changes made

- Fixed a visibility bug in scroll animations: the dissertation body could stay invisible on a 320 × 568 screen because less than 12% of that long section could ever fit in the viewport. Sections now reveal when they enter the viewport.
- Moved the mobile homepage's Work and CV buttons ahead of the portrait.
- Added CV to desktop and mobile navigation, and provided a mobile navigation fallback when JavaScript is unavailable.
- Made the expanded mobile menu scroll within short screens so its last links remain reachable.
- Added “Based in Maidenhead, UK · Open to relocation” to the homepage.
- Corrected the QR case study's input-capacity claims. The linked implementation confuses data codewords with payload capacity at its upper boundaries. The case study now states the limitation; the separate QR repository has not been modified.
- Labelled Maidenhead Central's external link “View development demo.”
- Generated compact JPEG previews for project sharing instead of pointing social crawlers at multi-megabyte originals.
- Removed canonical tags from noindex pages, including the 404 page's invalid canonical target.
- Updated Astro, Vite, YAML parsing and affected transitive dependencies. The dependency audit reports zero known vulnerabilities at review time.
- Set Node 24 for GitHub Actions and documented Node 22.19 as the minimum, matching the updated dependency requirements.
- Added deployment concurrency control and excluded all `.env.*` files except an example file from Git.

## Verification

| Area | Result and scope |
| --- | --- |
| Production build | Passed with Node 24.19.0; 14 generated pages plus redirect documents |
| Fresh installation | `npm ci` passed in an isolated folder, using the supplied lockfile |
| Fresh build | Passed without the original `node_modules` or image cache |
| Dependencies | Audit completed with zero known vulnerabilities |
| Internal URLs and assets | 536 references across 20 HTML files checked with zero errors: page links, image sources and variants, stylesheets, PDF paths, fragments and social-image targets |
| Responsive structure | All 13 content pages checked at 320, 390, 768 and 1280 CSS pixels; no horizontal document overflow or detected broken loaded images |
| Navigation | Mobile open/close and Escape focus restoration checked; all six menu links reachable by scrolling at 320 × 400; desktop project preview follows keyboard focus |
| Page structure | One H1 per content page, descriptions present, no duplicate IDs, image alt attributes and named links checked |
| CV | Two pages rendered and visually reviewed; selectable PDF text; preview images match the PDF pixel-for-pixel |
| PDF transport | Both local URLs return HTTP 200, `application/pdf`, and bytes matching the source PDFs exactly; download attributes are present. The in-app browser did not expose a download-completion event, so confirm browser saving in the final live-site check |
| Dissertation | 49-page PDF opens for extraction; cover, abstract and methodology reviewed; headline dataset and evaluation figures match the case study; methodology preview matches page 19 |
| Search metadata | Sitemap contains 10 public URLs; hidden Sudoku and Gaming pages remain noindex and outside the sitemap |
| Privacy | No mobile phone number or street address found in site/CV text; public email retained; no GPS EXIF tags found in built images; unused private working photos excluded from build |
| Project evidence | GitHub profile and all linked repositories respond; Maidenhead Central listings and Niko's Nook live map render in the browser |
| Other external assets | Font stylesheet, avatar and all six video URLs respond; Letterboxd and FACEIT profiles render |

These checks are not a claim of full WCAG certification or a test on physical iOS hardware. Authentication, bookings, transactional email and other state-changing flows in the separate Maidenhead Central application were outside this portfolio review. Its public landing page was checked without creating accounts or reservations.

LinkedIn presents a sign-in wall to this browser, so the profile content could not be verified signed out. Some social services reject automated HTTP checks; a successful HTTP response alone does not prove account ownership or every interactive feature. No email was sent to test mailbox delivery.

## Publishing this replacement safely

This workspace is now connected to the existing `gabrieldorosh/gabrieldorosh.github.io` repository. `main` tracks `origin/main`; the old site is retained at commit `efff99de4308d14bb099c00959e66e0c0aa25abf` and on the local `backup/pre-portfolio-replacement` branch. The replacement is prepared as changes on top of that history. Nothing has been pushed.

1. Use Node 24 LTS locally, matching `.node-version` and the workflow.
2. Review the staged replacement in this checkout. The old root HTML, scripts and assets are removed or moved into the Astro structure; their originals remain in Git history.
3. Confirm the source, public assets, workflow, editable CV, package files and configuration are included.
4. Keep `node_modules/`, `dist/`, `.astro/`, `tmp/`, local editor folders, `.env` files, and `src/assets/unused/` out of the commit. The ignore rules exclude them. This review document is documentation and is not deployed by Astro.
5. Run `npm ci`, `npm run build`, and `npm run preview`. Inspect the final diff before committing. No force push is necessary.
6. In GitHub's **Settings → Pages**, choose **GitHub Actions** as the publishing source. Keep the custom domain as `gabrieldorosh.com` and enable HTTPS when available.
7. Push the reviewed replacement to `main` when ready to publish. The supplied workflow builds and deploys automatically. Wait for both jobs to succeed.
8. Complete the checks below before sharing the URL.

The supplied action versions match the [official Astro Pages workflow](https://github.com/withastro/action). GitHub documents [custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) and [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https).

## Five-minute check after deployment

- Open the non-www domain in a private browser window and confirm the new homepage, not the previous site, is showing.
- Use a phone to open Work, one case study, and CV. Confirm navigation, text visibility and image crops; test Safari if available.
- Open and download the CV and dissertation PDFs from the live site.
- Open GitHub, LinkedIn, the property demo and the community map. Confirm that the public email opens the intended recipient in your mail app.
- Confirm `/projects.html`, `/gaming.html` and `/work/` lead to the corresponding new routes; check an invented URL reaches the custom 404 page.
- Check `https://www.gabrieldorosh.com/`. Its certificate was invalid before deployment; inspect the existing DNS and GitHub domain configuration if it remains invalid. Do not bypass the browser's warning. Use the non-www URL when sharing.

## Improvements worth considering later

1. **Strengthen the evidence before adding more projects.** Correct the QR generator's version boundaries and add reference/scanner tests in that project's repository. Keep Sudoku unlisted until its input validation and animation trace improve.
2. **Make the About page slightly more professional at the start.** A short paragraph about the engineering problems you enjoy could precede the travel biography. The existing personal material can stay.
3. **Tailor the CV for the role.** For software positions, consider putting selected technical projects before older non-software work. Keep the public portfolio broad, and tailor the application CV to the actual vacancy.
4. **Keep the public profile deliberate.** Review the personal social accounts linked from the footer as a hiring manager would. Their presence is a presentation choice, not a publishing blocker.
5. **Improve case-study evidence incrementally.** Add a concise architecture diagram, test result or concrete engineering decision where it genuinely clarifies the work. Avoid adding dashboards or new interactions simply to fill the site.

## Technical evidence retained locally

Audit logs and scripts are in `tmp/audit/`, and the isolated installation is in `tmp/clean-build/`. Both are excluded from Git and from the deployed website. The original CV PDF and editable LaTeX source were retained unchanged.

QR capacity review used the project's public [encoding source](https://github.com/gabrieldorosh/QR-Code-Generator/blob/main/encoding.py) and [input validation](https://github.com/gabrieldorosh/QR-Code-Generator/blob/main/app.py). The code allocates 19/34 data codewords but also needs mode and length overhead, giving 17/32 bytes of payload in the supported Byte Mode configuration.

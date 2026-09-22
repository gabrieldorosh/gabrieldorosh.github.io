import { promises as fs } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const require = createRequire(import.meta.url);
const yaml = require("js-yaml") as typeof import("js-yaml");

const projectFiles = [
  "predictive-analysis.md",
  "maidenhead-central.md",
  "qr-code-generator.md",
  "sudoku-solver.md",
  "portfolio-design-build.md",
  "nikos-nook.md",
] as const;

const projects = defineCollection({
  // Astro 7.1 currently has a Windows module-runner regression when the built-in
  // glob loader evaluates picomatch. The explicit file list keeps Markdown
  // authoring intact and is deterministic on both Windows and GitHub Actions.
  loader: {
    name: "explicit-project-markdown-loader",
    async load({
      config,
      generateDigest,
      logger,
      parseData,
      renderMarkdown,
      store,
      watcher,
    }) {
      store.clear();

      for (const fileName of projectFiles) {
        const fileUrl = new URL(`./content/projects/${fileName}`, import.meta.url);
        const absolutePath = fileURLToPath(fileUrl);
        const relativePath = `src/content/projects/${fileName}`;
        const source = await fs.readFile(fileUrl, "utf8");
        const frontmatterMatch = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

        if (!frontmatterMatch) {
          logger.error(`${relativePath} is missing valid YAML frontmatter.`);
          continue;
        }

        const [, rawFrontmatter, body] = frontmatterMatch;
        const id = fileName.replace(/\.md$/, "");
        const rawData = yaml.load(rawFrontmatter);
        const data = await parseData({
          id,
          data: rawData,
          filePath: absolutePath,
        });
        const rendered = await renderMarkdown(body, { fileURL: fileUrl });

        store.set({
          id,
          data,
          body,
          rendered,
          digest: generateDigest(source),
          filePath: relativePath,
          assetImports: rendered.metadata?.imagePaths,
        });
        watcher?.add(absolutePath);
      }
    },
  },
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      shortTitle: z.string(),
      summary: z.string(),
      seoDescription: z.string().max(160).optional(),
      year: z.union([z.number().int(), z.string()]),
      type: z.string(),
      role: z.string(),
      featured: z.boolean(),
      order: z.number().int().nonnegative(),
      draft: z.boolean(),
      listed: z.boolean().default(true),
      accent: z.string(),
      technologies: z.array(z.string()),
      cover: image().optional(),
      homeCover: image().optional(),
      coverFit: z.enum(["cover", "contain"]).default("cover"),
      liveUrl: z.url().optional(),
      liveLabel: z.string().optional(),
      repoUrl: z.url().optional(),
      documentUrl: z.string().optional(),
      documentLabel: z.string().optional(),
      phoneScreens: z
        .array(
          z.object({
            image: image().optional(),
            label: z.string(),
            alt: z.string(),
            caption: z.string(),
          }),
        )
        .default([]),
    }),
});

export const collections = { projects };

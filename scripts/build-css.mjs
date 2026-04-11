/**
 * Builds dist/styles.css from src/styles/globals.css using PostCSS +
 * @tailwindcss/postcss, then strips the @layer theme block so the
 * distributed CSS does not override the consuming app's Tailwind
 * theme / CSS custom-property values.
 *
 * The theme IS still processed at build time (so spacing-scale utilities
 * like space-x-6 are generated correctly), but it is removed from the
 * output. Consumers running Tailwind v4 already have these variables via
 * their own `@import "tailwindcss"`.
 */
import tailwindcss from "@tailwindcss/postcss";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import postcss from "postcss";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

const stripThemeLayer = {
  postcssPlugin: "strip-tailwind-theme-layer",
  AtRule: {
    layer(atRule) {
      if (atRule.params === "theme") {
        atRule.remove();
      }
    },
  },
};

const from = resolve(root, "src/styles/globals.css");
const to = resolve(root, "dist/styles.css");
const css = readFileSync(from, "utf-8");

const result = await postcss([tailwindcss, stripThemeLayer]).process(css, {
  from,
  to,
  map: false,
});

mkdirSync(resolve(root, "dist"), { recursive: true });
writeFileSync(to, result.css);
console.log("CSS built and theme layer stripped →", to);

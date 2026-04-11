import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  external: ["react", "react-dom"],
  clean: true,
  onSuccess:
    "postcss src/styles/globals.css -o dist/styles.css && cp src/styles/tailwind-source.css dist/tailwind-source.css",
});

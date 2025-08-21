import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";
const isDev = process.env.NODE_ENV === "development";
export default defineConfig({
  lib: [
    {
      format: "esm",
      bundle: false,
      dts: true,
      output: {
        distPath: {
          root: "./dist/esm",
        },
      },
    },
    {
      format: "cjs",
      bundle: false,
      dts: true,
      output: {
        distPath: {
          root: "./dist/cjs",
        },
      },
    },
  ],
  output: {
    target: "web",
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        development: isDev,
        refresh: isDev,
        runtime: "automatic",
      },
    }),
  ],
});

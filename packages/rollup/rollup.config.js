/** @type {import('rollup').RollupOptions} */
import typescript from "rollup-plugin-typescript2";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
// import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 自动扫描 src 下所有一级目录的 index.ts/tsx 作为入口
function getEntries() {
  const srcDir = path.resolve(__dirname, "src");
  const entries = {};

  fs.readdirSync(srcDir).forEach((name) => {
    const dir = path.join(srcDir, name);
    //要手动排出哪些是非入口文件夹，所以就体现出了将组件放在componets下的好处
    if (
      fs.statSync(dir).isDirectory() &&
      name !== "assets" &&
      name !== "styles" &&
      name !== "utils"
    ) {
      const tsx = path.join(dir, "index.tsx");
      const ts = path.join(dir, "index.ts");
      if (fs.existsSync(tsx)) {
        entries[name] = `src/${name}/index.tsx`;
      } else if (fs.existsSync(ts)) {
        entries[name] = `src/${name}/index.ts`;
      }
    } else if (!fs.statSync(dir).isDirectory()) {
      const ext = path.extname(name);
      const baseName = path.basename(name, ext);
      if (ext === ".ts" || ext === ".tsx") {
        entries[baseName] = `src/${name}`;
      }
    }
  });
  return entries;
}
// ---cut---
export default {
  input: getEntries(),

  output: [
    {
      dir: "dist/cjs",
      format: "cjs",
      entryFileNames: (chunk) =>
        chunk.name === "index" ? "index.js" : "[name]/index.js",
      chunkFileNames: "chunks/[name]-[hash].js",
      manualChunks: {
        // 将src/utils下的所有模块打包到chunks/utils.js
        utils: ["src/utils/index.ts"],
        // // 可选: 按目录自动分组其他模块
        // // // 例如将src/lib下的模块打包到chunks/lib.js
        // 'lib': (module) => module.id.includes('src/lib')
      },
    },
    {
      experimentalCodeSplitting: true,
      dir: "dist/esm",
      format: "esm",
      entryFileNames: (chunk) =>
        chunk.name === "index" ? "index.mjs" : "[name]/index.mjs",
      chunkFileNames: "chunks/[name]-[hash].js",
      manualChunks: {
        // 将src/utils下的所有模块打包到chunks/utils.js
        utils: ["src/utils/index.ts"],
        // // 可选: 按目录自动分组其他模块
        // // // 例如将src/lib下的模块打包到chunks/lib.js
        // 'lib': (module) => module.id.includes('src/lib')
      },
    },
    // {
    //   dir: "dist/umd",
    //   format: "umd",
    //   name: "LcsyDesign", // 全局变量名称
    //   entryFileNames: "[name]/index.umd.js", // 输出到 [name]/index.umd.js
    //   globals: {
    //     react: "React",
    //     "react-dom": "ReactDOM",
    //   },
    // },
  ],

  plugins: [
    typescript({
      tsconfig: "./tsconfig.json",
      useTsconfigDeclarationDir: false,
      tsconfigOverride: {
        compilerOptions: {
          declaration: true,
          declarationDir: undefined,
          outDir: undefined,
        },
      },
      // 关键：让 d.ts 跟随 js 输出到 output.dir
      clean: true,
    }),
    replace({
      preventAssignment: true, // 显式指定需要保留的指令,
      patterns: [
        {
          test: /"use client";/g, // 正则匹配指令字符串
          replace: '"use client";', // 替换为自身，即保留
        },
      ],
    }),
    commonjs({
      // 转换 CommonJS 模块为 ESM，处理默认导出转命名导出
      include: /node_modules/,
    }),
    postcss({
      // 处理CSS文件
      extract: false, // 将CSS提取到单独的文件
      modules: false, // 如果使用CSS Modules，设置为true
      minimize: true, // 压缩CSS
    }),
    // resolve(),
  ],
  external: ["react", "react-dom"], // 排除外部依赖，避免打包进最终产物
};

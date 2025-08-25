/** @type {import('rollup').RollupOptions} */
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
// import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

// ---cut---
export default {
  input: "src/index.ts",
  output: [
    {
      file: "./dist/cjs/index.js",
      format: "cjs",
    },
    {
      file: "./dist/esm/index.mjs",
      format: "esm",
    },
    {
      file: "dist/dist.umd.js",
      name: "Xia",
      format: "umd",
globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "react/jsx-runtime": "ReactJSXRuntime", // 对应 jsx-runtime 的全局变量?没太懂
      },
    },
  ],
  plugins: [
    // nodeResolve(), // 解析 node 模块和相对路径
    typescript({ tsconfig: "./tsconfig.json", outDir: undefined }), // 处理 TypeScript 语法和模块
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

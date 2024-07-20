import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";
import { fileURLToPath } from "url";
import { globSync } from 'glob'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({tsconfigPath: './tsconfig.app.json', rollupTypes: true})],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      formats: ['es']
    },
    rollupOptions: {
      // Make sure to externalize dependencies that you don't want to bundle
      external: ["react", "react-dom", "react/jsx-runtime"],
      input: Object.fromEntries(
        globSync(['src/components/ReactXsdTree.tsx', 'src/index.ts', 'src/api/index.ts']).map((file) => {
          // This remove `src/` as well as the file extension from each
          // file, so e.g. src/nested/foo.js becomes nested/foo
          const entryName = path.relative(
            'src',
            file.slice(0, file.length - path.extname(file).length)
          )
          // This expands the relative paths to absolute paths, so e.g.
          // src/nested/foo becomes /project/src/nested/foo.js
          const entryUrl = fileURLToPath(new URL(file, import.meta.url))
          return [entryName, entryUrl]
        })
      ),
      output: {
        entryFileNames: '[name].js',
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          'react/jsx-runtime': 'react/jsx-runtime'
        },
      },
    },
  },
});

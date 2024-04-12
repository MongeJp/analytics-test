import { resolve } from 'path'
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        minify: true,
        lib: {
            entry: resolve(__dirname, "main.js"),
            name: "jjtracking",
            fileName: (format) => `jjtracking.${format}.js`,
        },
    },
});
import {defineConfig} from 'astro/config';
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

import vue from "@astrojs/vue";

// https://astro.build/config
export default defineConfig({
    site: "https://www.alancolant.com",
    integrations: [
        sitemap({}),
        prefetch(),
        tailwind({
            applyBaseStyles: false,
        }),
        mdx({
            syntaxHighlight: 'shiki',
            shikiConfig: {
                theme: "dracula"
            }
        }),
        vue()
    ],
});

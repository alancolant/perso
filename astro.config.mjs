import {defineConfig} from 'astro/config';
import sitemap from "@astrojs/sitemap";

import prefetch from "@astrojs/prefetch";
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    site: "https://www.alancolant.com",
    output: 'hybrid',
    adapter: node({
        mode: 'standalone',
    }),
    integrations: [sitemap({}), prefetch()]
});

import {defineConfig} from 'astro/config';
import sitemap from "@astrojs/sitemap";

import prefetch from "@astrojs/prefetch";

// https://astro.build/config
export default defineConfig({
    site: "https://dev.alancolant.com",
    integrations: [sitemap({}), prefetch()]
});

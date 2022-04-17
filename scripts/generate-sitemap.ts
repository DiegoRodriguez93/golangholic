import { SitemapStream } from 'sitemap';
import matter from 'gray-matter';
import globby from 'globby';
import path from 'path';
import fs from 'fs';

const OUTPUT_FILE = path.resolve(__dirname, '..', 'public', 'sitemap.xml');

(async () => {
  const sitemap = new SitemapStream({
    hostname: 'https://codeholics.vercel.app',
    xmlns: {
      xhtml: true,
      news: false,
      image: false,
      video: false,
    },
  });

  const locales = ['en', 'es'];

  const pages = await globby([
    'src/pages/*.tsx',
    '!src/pages/404.tsx',
    '!src/pages/500.tsx',
    '!src/pages/_*.tsx',
    '!src/pages/api',
  ]);

  const blogs = fs.readdirSync(path.join(__dirname, '..', 'blogs'));

  const writeStream = fs.createWriteStream(OUTPUT_FILE);

  sitemap.pipe(writeStream);

  pages.forEach((page) => {
    const name = path.basename(page, path.extname(page));
    const url = name === 'index' ? '/' : `/${name}`;
    for (const locale of locales) {
      sitemap.write({
        url: locale === 'en' ? url : `/es${url}`,
        links: [
          { lang: 'en', url: `https://codeholics.vercel.app${url}` },
          { lang: 'es', url: `https://codeholics.vercel.app/es${url}` },
        ],
      });
    }
  });

  blogs.forEach((blog) => {
    const slug = blog.replace(/\.mdx/, '');
    const url = `/blog/${slug}`;
    const source = fs.readFileSync(
      path.join(__dirname, '..', 'blogs', blog),
      'utf8',
    );
    const { data } = matter(source);

    if (data.isPublished) {
      sitemap.write({
        url: data.locale === 'en' ? url : `/fr${url}`,
        links: [
          {
            lang: 'en',
            url:
              data.locale === 'en'
                ? `https://codeholics.vercel.app${url}`
                : `https://codeholics.vercel.app${data.alternate}`,
          },
          {
            lang: 'es',
            url:
              data.locale === 'en'
                ? `https://codeholics.vercel.app/es${data.alternate}`
                : `https://codeholics.vercel.app/es${url}`,
          },
        ],
      });
    }
  });

  sitemap.end();

  console.log(`Sitemap written at ${OUTPUT_FILE}`);
})();

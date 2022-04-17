import RSS from 'rss';
import matter from 'gray-matter';
import path from 'path';
import fs from 'fs';

const OUTPUT_FILE_EN = path.resolve(__dirname, '..', 'public', 'en.feed.xml');
const OUTPUT_FILE_ES = path.resolve(__dirname, '..', 'public', 'es.feed.xml');

(async () => {
  const feedEN = new RSS({
    title: "Diego Rodriguez's Blog",
    description: 'Picadores de codigo.',
    site_url: 'https://picadores-de-codigo.vercel.app',
    feed_url: 'https://picadores-de-codigo.vercel.app/en.feed.xml',
    language: 'en',
  });

  const feedES = new RSS({
    title: 'Blog de Diego Rodriguez',
    description: 'Picadores de codigo.',
    site_url: 'https://picadores-de-codigo.vercel.app/es',
    feed_url: 'https://picadores-de-codigo.vercel.app/es.feed.xml',
    language: 'es',
  });

  const blogs = fs.readdirSync(path.join(__dirname, '..', 'blogs'));

  blogs
    .map(
      (
        blog,
      ): {
        [key: string]: string | boolean;
      } => {
        const slug = blog.replace(/\.mdx/, '');
        const source = fs.readFileSync(
          path.join(__dirname, '..', 'blogs', blog),
          'utf8',
        );
        const { data } = matter(source);
        return { ...data, slug };
      },
    )
    .filter((blog) => blog.isPublished)
    .sort(
      (a, b) =>
        Number(new Date(b.publishedAt as string)) -
        Number(new Date(a.publishedAt as string)),
    )
    .forEach((blog) => {
      if (blog.locale === 'en') {
        feedEN.item({
          title: blog.title,
          url: `https://picadores-de-codigo.vercel.app/blog/${blog.slug}`,
          description: blog.description,
          categories: blog.tags,
          author: 'Diego Rodriguez',
          date: blog.publishedAt,
        });
      } else {
        feedES.item({
          title: blog.title,
          url: `https://picadores-de-codigo.vercel.app/es/blog/${blog.slug}`,
          description: blog.description,
          categories: blog.tags,
          author: 'Diego Rodriguez',
          date: blog.publishedAt,
        });
      }
    });

  fs.writeFileSync(OUTPUT_FILE_EN, feedEN.xml({ indent: true }));
  console.log(`RSS feed written at ${OUTPUT_FILE_EN}`);

  fs.writeFileSync(OUTPUT_FILE_ES, feedES.xml({ indent: true }));
  console.log(`RSS feed written at ${OUTPUT_FILE_ES}`);
})();

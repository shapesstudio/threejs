import Link from 'next/link';
import Head from 'next/head';
import Layout from '../../components/layout';
import {
  getMedia,
  getPosts,
  getFeaturedMedia,
} from '../../utils/wordpress';

import Post from '../../components/Case';

export default function Cases({ posts, media }) {

  const jsxPosts = posts.map(( post ) => {
    const featuredMediaId = post['featured_media'];
    const featuredMedia = getFeaturedMedia(media, featuredMediaId);

    return (
        <div>
          <Post post={post} featuredMedia={featuredMedia} key={post.id} />
        </div>
    )
  });


  return (
    <Layout>
      <section>
          {jsxPosts}
      </section>
    </Layout>

  )
}

export async function getStaticProps({params}) {
  const posts = await getPosts();
  const media = await getMedia();

  return {
    props: {
      posts,
      media,
    },
    revalidate: 10, // In seconds
  };
}

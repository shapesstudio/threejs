const BASE_URL = 'https://site.shapes.studio/wp-json/wp/v2';

export async function getPosts() {
  const postsRes = await fetch(BASE_URL + '/posts');
  const posts = await postsRes.json();
  return posts;
}

export async function getPost(slug) {
  const posts = await getPosts();
  const postArray = posts.filter((post) => post.slug == slug);
  const post = postArray.length > 0 ? postArray[0] : null;
  return post;
}

export async function getSlugs(type) {
  let elements = [];
  switch (type) {
    case 'posts':
      elements = await getPosts();
      break;
  }
  const elementsIds = elements.map((element) => {
    return {
      params: {
        slug: element.slug,
      },
    };
  });
  return elementsIds;
}

export async function getMedia() {
  const mediaRes = await fetch(BASE_URL + '/media');
  const media = await mediaRes.json();
  return media;
}

export function getFeaturedMedia(media, id) {
  const featuredMediaArray = media.filter((element) => element.id == id);
  return featuredMediaArray.length > 0 ? featuredMediaArray[0] : null;
}

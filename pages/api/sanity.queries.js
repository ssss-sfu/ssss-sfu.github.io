import groq from "groq";

export const postsQuery = groq`*[_type == "post" && defined(slug.current)] | order(_createdAt desc)`;

export async function getPosts(client) {
  return await client.fetch(postsQuery);
}

export const postBySlugQuery = groq`*[_type == "post" && slug.current == $slug][0]{
  ...,
  author->{name}
}`;

export async function getPost(client, slug) {
  return await client.fetch(postBySlugQuery, {
    slug,
  });
}

export const postSlugsQuery = groq`
*[_type == "post" && defined(slug.current)][].slug.current
`;

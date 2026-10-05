export function getPostById(posts, postId) {
  return posts.find(p => p.id === postId) || null;
}
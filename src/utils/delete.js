export function deletePost(posts, postId) {
  const index = posts.findIndex(p => p.id === postId);
  if (index !== -1) {
    posts.splice(index, 1);
  }
}
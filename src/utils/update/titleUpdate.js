export function updateTitle(post, newTitle) {
  if (newTitle.trim() !== '') {
    post.title = newTitle.trim();
  }
}
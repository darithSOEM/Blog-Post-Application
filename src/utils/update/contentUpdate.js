export function updateContent(post, newContent) {
  if (newContent.trim() !== '') {
    post.content = newContent.trim();
  }
}
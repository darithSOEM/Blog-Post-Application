export const updateTitle=(post, newTitle)=> {
  if (newTitle.trim() !== '') {
    post.title = newTitle.trim();
  }
}
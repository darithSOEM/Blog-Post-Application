export const createPost =(posts, title, content)=>{
  if (!title.trim() || !content.trim()) return null;

  const newPost = {
    id: Date.now(),
    title: title.trim(),
    content: content.trim()
  };

  posts.push(newPost);
  return newPost;
}
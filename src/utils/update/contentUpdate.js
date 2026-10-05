export const updateContent =(post, newContent)=>{
  if (newContent.trim() !== '') {
    post.content = newContent.trim(); 
  }
}
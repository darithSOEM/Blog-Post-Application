import { createPost } from './utils/create.js';
import { deletePost } from './utils/delete.js';
import { getPostById } from './utils/getPost.js';
import { updateTitle } from './utils/update/titleUpdate.js';
import { updateContent } from './utils/update/contentUpdate.js';

// Existing array populated with initial default post data
const posts = [
  {
    id: 1,
    title: "Angkor Wat Sunrise & Temple Tour",
    content: "Experience the magnificent sunrise over the towers of Angkor Wat before exploring Bayon, Ta Prohm (the Tomb Raider temple), and Angkor Thom with an expert local guide."
  },
  {
    id: 2,
    title: "Tonle Sap Lake & Kampong Phluk Floating Village",
    content: "Take a boat cruise through the iconic flooded mangrove forests and visit the stilted village of Kampong Phluk to witness local fishing culture on Tonle Sap Lake."
  },
  {
    id: 3,
    title: "Phare Cambodian Circus Evening Show",
    content: "Enjoy an unforgettable evening of traditional live theater, acrobatics, dance, and live music performed by talented artists from the Phare Ponleu Selpak school."
  },
  {
    id: 4,
    title: "Siem Reap Countryside Quad Bike Adventure",
    content: "Ride off the beaten path through scenic rural villages, green rice paddies, and local farms on a guided ATV/quad bike sunset tour."
  },
  {
    id: 5,
    title: "Kbal Spean & Banteay Srei Day Trip",
    content: "Hike up the River of a Thousand Lingas at Kbal Spean and discover the intricate, detailed pink sandstone carvings at Banteay Srei temple."
  },
  {
    id: 6,
    title: "Khmer Cooking Class & Local Market Tour",
    content: "Visit a bustling local market to select fresh ingredients, then learn how to prepare authentic Khmer dishes like Fish Amok and Beef Lok Lak with a professional chef."
  }
];

// DOM References
let openModalBtn;
let closeModalBtn;
let submitPostBtn;
let modal;
let titleInput;
let contentInput;
let postsContainer;

// Initialize and render initial posts on window load
window.onload = () => {
  // Bind DOM elements after window finishes loading
  openModalBtn = document.getElementById('open-modal-btn');
  closeModalBtn = document.getElementById('cancel-modal-btn');
  submitPostBtn = document.getElementById('submit-post-btn');
  modal = document.getElementById('post-modal');

  titleInput = document.getElementById('post-title-input');
  contentInput = document.getElementById('post-content-input');
  postsContainer = document.getElementById('posts-container');

  // Modal Event Listeners
  openModalBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    titleInput.focus();
  });

  closeModalBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  submitPostBtn.addEventListener('click', () => {
    const title = titleInput.value;
    const content = contentInput.value;

    if (!title.trim() || !content.trim()) {
      alert('Please fill out both title and content.');
      return;
    }

    createPost(posts, title, content);
    renderPosts();
    closeModal();
  });

  // Initial render of existing default posts
  renderPosts();
};

function closeModal() {
  modal.classList.add('hidden');
  titleInput.value = '';
  contentInput.value = '';
}

// Render Cards Function
function renderPosts() {
  postsContainer.innerHTML = '';

  posts.forEach(post => {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = post.id;

    card.innerHTML = `
      <div class="card-title-area">
        <h3 class="post-title-text">${escapeHTML(post.title)}</h3>
      </div>

      <div class="card-content-area">
        <p class="post-content-text">${escapeHTML(post.content)}</p>
      </div>

      <div class="card-actions">
        <button class="btn-primary btn-edit-title">Edit Title</button>
        <button class="btn-primary btn-edit-content">Edit Content</button>
        <button class="btn-danger btn-delete">Delete</button>
      </div>
    `;

    const editTitleBtn = card.querySelector('.btn-edit-title');
    const editContentBtn = card.querySelector('.btn-edit-content');
    const deleteBtn = card.querySelector('.btn-delete');

    // 1. Delete Handler
    deleteBtn.addEventListener('click', () => {
      deletePost(posts, post.id);
      renderPosts();
    });

    // 2. Edit Title Handler
    editTitleBtn.addEventListener('click', () => {
      const titleArea = card.querySelector('.card-title-area');
      titleArea.innerHTML = `
        <div class="inline-edit-box">
          <input type="text" class="edit-title-input" value="${escapeHTML(post.title)}" />
          <button class="btn-success btn-save-title">Save Title</button>
          <button class="btn-secondary btn-cancel-title">Cancel</button>
        </div>
      `;

      titleArea.querySelector('.btn-save-title').addEventListener('click', () => {
        const newTitle = titleArea.querySelector('.edit-title-input').value;
        const targetPost = getPostById(posts, post.id);
        if (targetPost) updateTitle(targetPost, newTitle);
        renderPosts();
      });

      titleArea.querySelector('.btn-cancel-title').addEventListener('click', () => {
        renderPosts();
      });
    });

    // 3. Edit Content Handler
    editContentBtn.addEventListener('click', () => {
      const contentArea = card.querySelector('.card-content-area');
      contentArea.innerHTML = `
        <div class="inline-edit-box">
          <textarea class="edit-content-input">${escapeHTML(post.content)}</textarea>
          <button class="btn-success btn-save-content">Save Content</button>
          <button class="btn-secondary btn-cancel-content">Cancel</button>
        </div>
      `;

      contentArea.querySelector('.btn-save-content').addEventListener('click', () => {
        const newContent = contentArea.querySelector('.edit-content-input').value;
        const targetPost = getPostById(posts, post.id);
        if (targetPost) updateContent(targetPost, newContent);
        renderPosts();
      });

      contentArea.querySelector('.btn-cancel-content').addEventListener('click', () => {
        renderPosts();
      });
    });

    postsContainer.appendChild(card);
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
  );
}
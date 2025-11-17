// SBA 5 - Interactive Personal Blog Platform for this SBA (by-TN)

// =======================
// Step 1: Global state
// =======================

// Notes to self:
// This array will hold all of my blog posts in memory. Thank GOD for these notes
// Each post will be an object like:
// { id: "some-unique-id", title: "text", content: "text", createdAt: "time" }
let posts = [];
console.log("Global posts array created:", posts);
// Note to self: commit after setting up global state and console.log


// Notes to self: Is the only way I can come back to code and really understand for real
// This will hold the id of the post I am editing.
// If this is null, that means I am creating a new post.
let currentEditPostId = null;
console.log("Current edit post id starts as:", currentEditPostId);
// Note to self: commit after adding currentEditPostId and console.log


// Key name for localStorage so I can find my posts later.
const STORAGE_KEY = "sba5_blog_posts_by_TN";
console.log("Local storage key is:", STORAGE_KEY);
// Note to self: commit after defining STORAGE_KEY and console.log

// =======================
// Step 2: Grab DOM elements
// =======================

// Notes to self:
// I am getting references to HTML elements I will prolly use a lot.

const postForm = document.querySelector("#postForm");
const postTitleInput = document.querySelector("#postTitle");
const postContentInput = document.querySelector("#postContent");
const savePostButton = document.querySelector("#savePostButton");
const cancelEditButton = document.querySelector("#cancelEditButton");
const formHelper = document.querySelector("#formHelper");
const postsContainer = document.querySelector("#postsContainer");
const noPostsMessage = document.querySelector("#noPostsMessage");

console.log("DOM elements selected:", {
  postForm,
  postTitleInput,
  postContentInput,
  savePostButton,
  cancelEditButton,
  formHelper,
  postsContainer,
  noPostsMessage,
});
// Note to self: commit after selecting DOM elements and logging them


// Notes to self:
// Helpe to get error message divs for title and content.
const titleErrorDiv = document.querySelector('[data-error-for="title"]');
const contentErrorDiv = document.querySelector('[data-error-for="content"]');

console.log("Error message elements:", {
  titleErrorDiv,
  contentErrorDiv,
});

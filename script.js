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


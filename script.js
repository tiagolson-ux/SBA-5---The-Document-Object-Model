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

// =======================
// Step 3: Utility functions
// =======================

// Notes to self:
// This function creates a simple unique id using the current time and a random number.
// I will use it when creating a new post.
const generateId = () => {
  const idValue = Date.now().toString() + "-" + Math.floor(Math.random() * 100000).toString();
  console.log("Generated id:", idValue);
  return idValue;
};
// Note to self: commit after adding generateId function and console.log


// Notes to self:
// This function saves the posts array into localStorage as a JSON string.
const savePostsToStorage = () => {
  const json = JSON.stringify(posts);
  localStorage.setItem(STORAGE_KEY, json);
  console.log("Posts saved to localStorage:", json);
};
// Note to self: commit after adding savePostsToStorage function and console.log


// Notes to self:
// This function loads posts from localStorage when the app starts.
const loadPostsFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  console.log("Raw data from localStorage:", stored);

  try {
    const parsed = JSON.parse(stored);
    // Make sure we got an array
    if (Array.isArray(parsed)) {
      posts = parsed;
      console.log("Posts loaded from localStorage:", posts);
    } else {
      console.log("Stored data was not an array. Resetting posts to empty array.");
      posts = [];
    }

     if (!stored) {
    console.log("No posts found in localStorage.");
    posts = [];
    return;
  }
  } catch (error) {
    console.log("Error parsing localStorage JSON. Resetting posts array.", error);
    posts = [];
  }
};

// =======================
// Step 4: Rendering posts
// =======================

// Notes to self:
// This function clears the posts container and rebuilds it based on the posts array.
const renderPosts = () => {
  console.log("Rendering posts. Current posts array:", posts);

  // Clear everything inside the container
  postsContainer.innerHTML = "";

  if (posts.length === 0) {
    // No posts to show
    noPostsMessage.classList.remove("hidden");
    return;
  }

  // There are posts, so hide the "no posts" message
  noPostsMessage.classList.add("hidden");

  // Loop through each post and create HTML elements for it
  posts.forEach((post) => {
    // Outer wrapper for each post
    const postDiv = document.createElement("div");
    postDiv.classList.add("post-item");
    // Store the post id on the element so we can find it when editing/deleting
    postDiv.dataset.postId = post.id;

    // Top row: title + meta info
    const titleRowDiv = document.createElement("div");
    titleRowDiv.classList.add("post-title-row");

    const titleHeading = document.createElement("div");
    titleHeading.classList.add("post-title");
    titleHeading.textContent = post.title;

    const metaDiv = document.createElement("div");
    metaDiv.classList.add("post-meta");
    metaDiv.textContent = `Created at: ${post.createdAt}`;

    titleRowDiv.appendChild(titleHeading);
    titleRowDiv.appendChild(metaDiv);

    // Content paragraph
    const contentDiv = document.createElement("div");
    contentDiv.classList.add("post-content");
    contentDiv.textContent = post.content;

    // Actions: edit + delete buttons
    const actionsDiv = document.createElement("div");
    actionsDiv.classList.add("post-actions");

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("post-button", "delete");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.postId = post.id;

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("post-button", "edit");
    editButton.textContent = "Edit";
    // Store action and post id in dataset for event delegation
    editButton.dataset.action = "edit";
    editButton.dataset.postId = post.id;

    actionsDiv.appendChild(editButton);
    actionsDiv.appendChild(deleteButton);

    // Put it all together inside the outer postDiv
    postDiv.appendChild(titleRowDiv);
    postDiv.appendChild(contentDiv);
    postDiv.appendChild(actionsDiv);

    // Finally, add the postDiv to the container
    postsContainer.appendChild(postDiv);
  });

  console.log("Finished rendering posts.");
};

// =======================
// Step 7: Handle form submit (create or update)
// =======================

// Notes to self:
// This function runs when the form submit event happens.
// It decides whether to create a new post or update an existing one.
const handleFormSubmit = (event) => {
  // Prevent page reload
  event.preventDefault();

  console.log("Form submitted.");

  // Check that fields are filled
  const formIsValid = validateForm();
  if (!formIsValid) {
    console.log("Form is not valid. Not saving.");
    return;
  }

  const titleValue = postTitleInput.value.trim();
  const contentValue = postContentInput.value.trim();

  // If currentEditPostId is null, create a new post
  if (!currentEditPostId) {
    const newPost = {
      id: generateId(),
      title: titleValue,
      content: contentValue,
      createdAt: new Date().toLocaleString(),
    };

    posts.push(newPost);
    console.log("New post added:", newPost);
    formHelper.textContent = "New post created successfully.";

  } else {
    // We are editing an existing post
    console.log("Editing existing post with id:", currentEditPostId);

    const index = posts.findIndex((post) => post.id === currentEditPostId);

    if (index !== -1) {
      posts[index].title = titleValue;
      posts[index].content = contentValue;
      console.log("Post updated:", posts[index]);
      formHelper.textContent = "Post updated successfully.";
    } else {
      console.log("Could not find post to edit. No changes made.");
    }
  }

  // Save to localStorage and re-render
  savePostsToStorage();
  renderPosts();

  // Reset form back to create mode
  resetFormToCreateMode();
};


// =======================
// Step 8: Handle click on posts (edit and delete)
// =======================

// Notes to self:
// This function listens for clicks on the posts container.
// It uses event delegation to handle Edit and Delete buttons.
const handlePostsContainerClick = (event) => {
  const clickedElement = event.target;

  // Only care about elements that have a data-action attribute
  const action = clickedElement.dataset.action;
  const postId = clickedElement.dataset.postId;

  if (!action || !postId) {
    // Clicked on something that is not an action button
    return;
  }

  console.log("Posts container click:", { action, postId });

  if (action === "delete") {
    // Delete the post
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) {
      console.log("Delete cancelled by user.");
      return;
    }

    posts = posts.filter((post) => post.id !== postId);
    console.log("Post deleted. Remaining posts:", posts);

    savePostsToStorage();
    renderPosts();
  }

  if (action === "edit") {
    // Edit the post (fill the form with its data)
    const postToEdit = posts.find((post) => post.id === postId);

    if (!postToEdit) {
      console.log("Could not find post to edit with id:", postId);
      return;
    }

    currentEditPostId = postId;
    postTitleInput.value = postToEdit.title;
    postContentInput.value = postToEdit.content;

    clearValidation();

    formHelper.textContent = "You are editing an existing post.";
    savePostButton.textContent = "Save Changes";
    cancelEditButton.classList.remove("hidden");

    console.log("Editing post:", postToEdit);
  }
};


// =======================
// Step 9: Cancel edit button handler
// =======================

// Notes to self:
// When I click cancel, I stop editing and go back to creating a new post.
const handleCancelEditClick = () => {
  resetFormToCreateMode();
  console.log("Cancel edit clicked. Back to create mode.");
};


// =======================
// Step 10: Wire up event listeners and initialize app
// =======================

const initializeApp = () => {
  console.log("Initializing app...");

  // Load posts from localStorage into the posts array
  loadPostsFromStorage();

  // Render any posts we loaded
  renderPosts();

  // Attach event listeners
  postForm.addEventListener("submit", handleFormSubmit);
  postsContainer.addEventListener("click", handlePostsContainerClick);
  cancelEditButton.addEventListener("click", handleCancelEditClick);

  // Start with form in create mode
  resetFormToCreateMode();

  console.log("App initialized.");
};

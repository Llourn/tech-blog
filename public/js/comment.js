const submitButton = document.querySelector('#post-comment');

const newPostHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const commentText = document.querySelector('#comment-box').value.trim();

  if (commentText) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        content: commentText,
        post_id: submitButton.dataset.postId,
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

submitButton.addEventListener('click', newPostHandler);

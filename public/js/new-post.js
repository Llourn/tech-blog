const newPostHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const title = document.querySelector('#post-title').value.trim();
  const image = document.querySelector('#post-image').value.trim();
  const body = document.querySelector('#post-body').value.trim();

  if (title && body) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, image, body }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
      // If successful, redirect the browser to the home page
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('#submit-post')
  .addEventListener('click', newPostHandler);

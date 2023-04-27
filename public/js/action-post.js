const postDeleteButton = document.querySelector('#post-update');
const postUpdateButton = document.querySelector('#post-delete');

const deletePostHandler = async (event) => {
  event.preventDefault();
  console.log('DELETE');
  // Send a POST request to the API endpoint
  const response = await fetch(
    `/api/posts/${postDeleteButton.dataset.postId}`,
    {
      method: 'DELETE',
    }
  );
  if (response.ok) {
    // If successful, redirect the browser to the home page
    document.location.replace('/dashboard');
  } else {
    alert(response.statusText);
  }
};

const updatePostHandler = async (event) => {
  event.preventDefault();

  document.location.replace(`/update-post/${postUpdateButton.dataset.postId}`);
};

postDeleteButton.addEventListener('click', updatePostHandler);
postUpdateButton.addEventListener('click', deletePostHandler);

const signupFormHandler = async (event) => {
    event.preventDefault();
  // get the calues for all necessary input values
  const usernameInput = document.querySelector('#username');
  const passwordInput = document.querySelector('#password');
  
   // Get the values from each input field
   const username = usernameInput.value.trim();
   const password = passwordInput.value.trim();

  // Check if all fields are filled
  if (!username || !password) {
    alert('Please fill in both fields.');
    return;
}

// Attempt to create a new user with the provided details
const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: { 'Content-Type': 'application/json' },
});

// Check the response from the server
if (response.ok) {
    // If the signup was successful, redirect to the homepage or login page
    document.location.replace('/');
} else {
    alert('Failed to sign up.');
}
};

// Add the event listener to the form's submit event, not the button's click event
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
// script.js
const messageDiv = document.getElementById('message');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  fetch('http://localhost:8080/data')
    .then(response => response.json())
    .then(data => {
      messageDiv.textContent = data.message;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
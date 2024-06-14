// script.js
const messageDiv = document.getElementById('message');
const button = document.querySelector('button');

button.addEventListener('click', () => {
  fetch('https://serious-person-tropical-balance-beta.pipeops.app/data')
    .then(response => response.json())
    .then(data => {
      messageDiv.textContent = data.message;
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
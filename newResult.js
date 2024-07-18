document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('sessionId');

  if (sessionId) {
      fetch(`http://localhost:3001/session/${sessionId}`)
          .then(response => response.json())
          .then(data => {
              displayMessages(data);
          })
          .catch(error => console.error('Error:', error));
  }

  document.getElementById('submitButton').addEventListener('click', onSubmitButtonClick);
  document.getElementById('userInput').addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
          onSubmitButtonClick();
      }
  });
});

function displayMessages(messages) {
  const messagesContainer = document.getElementById('messagesContainer');
  messagesContainer.innerHTML = '';

  messages.forEach((message, index) => {
      const messageElement = document.createElement('div');
      messageElement.style.border = '1px solid black';
      messageElement.style.padding = '10px';
      messageElement.style.margin = '10px 0';
      messageElement.style.display = 'flex';
      messageElement.style.justifyContent = 'space-between';

      const messageText = document.createElement('p');
      messageText.textContent = message.message;
      messageElement.appendChild(messageText);

      const likeButton = document.createElement('button');
      likeButton.textContent = `Like (${message.likes})`;
      likeButton.addEventListener('click', () => {
          toggleLike(sessionId, index, likeButton);
      });
      messageElement.appendChild(likeButton);

      messagesContainer.appendChild(messageElement);
  });
}

function onSubmitButtonClick() {
  const userInput = document.getElementById('userInput').value;
  const urlParams = new URLSearchParams(window.location.search);
  const sessionId = urlParams.get('sessionId');

  fetch('http://localhost:3001/submit', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, message: userInput }),
  })
  .then(response => response.json())
  .then(data => {
      window.location.href = `newResult.html?sessionId=${data.sessionId}`;
  })
  .catch(error => console.error('Error:', error));
}

function toggleLike(sessionId, messageIndex, likeButton) {
  fetch('http://localhost:3001/like', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId, messageIndex }),
  })
  .then(response => response.json())
  .then(data => {
      likeButton.textContent = `Like (${data.likes})`;
  })
  .catch(error => console.error('Error:', error));
}

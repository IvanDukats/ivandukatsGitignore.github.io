const apiUrl = 'https://script.google.com/macros/s/AKfycbxwbFXevDp3Zs7bmWRyKrFZrLzfJfoKwPOteOTvxLXgJB4WBbDsEwcTkoT64xuGpOjcQw/exec';

document.addEventListener('DOMContentLoaded', function() {
    const queryParams = new URLSearchParams(window.location.search);
    const sessionId = queryParams.get('sessionId');

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const messagesContainer = document.getElementById('messagesContainer');
            messagesContainer.innerHTML = ''; // Clear the container before adding messages
            data.forEach((row, index) => {
                if (row[0] === sessionId.toString()) {
                    const messageDiv = document.createElement('div');
                    messageDiv.classList.add('message-container');
                    const messageParagraph = document.createElement('p');
                    messageParagraph.textContent = row[1];
                    messageDiv.appendChild(messageParagraph);

                    const likeButton = document.createElement('button');
                    likeButton.textContent = `Like (${row[2]})`;
                    likeButton.addEventListener('click', () => {
                        fetch(apiUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ type: 'addLike', sessionId, message: row[1] }),
                        })
                        .then(response => response.json())
                        .then(data => {
                            likeButton.textContent = `Like (${data.likes})`;
                        })
                        .catch(error => {
                            console.error('Error:', error);
                        });
                    });

                    messageDiv.appendChild(likeButton);
                    messagesContainer.appendChild(messageDiv);
                }
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    document.getElementById('submitButton').addEventListener('click', function() {
        const userInput = document.getElementById('userInput').value;

        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: 'addMessage', sessionId, message: userInput }),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Message sent successfully:', data);
            // Optionally, you can reload or fetch the messages again
            window.location.href = `newResult.html?sessionId=${sessionId}`;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    });
});

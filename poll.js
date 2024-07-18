const apiUrl = 'https://script.google.com/macros/s/AKfycbxwbFXevDp3Zs7bmWRyKrFZrLzfJfoKwPOteOTvxLXgJB4WBbDsEwcTkoT64xuGpOjcQw/exec';

document.getElementById('submitButton').addEventListener('click', function() {
    const userInput = document.getElementById('userInput').value;
    const sessionId = new Date().getTime(); // Example sessionId, replace with actual logic

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
        // Redirect to the results page with the sessionId
        window.location.href = `newResult.html?sessionId=${sessionId}`;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});



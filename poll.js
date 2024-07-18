document.getElementById('submitButton').addEventListener('click', onSubmitButtonClick);
document.getElementById('userInput').addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        onSubmitButtonClick();
    }
});

function onSubmitButtonClick() {
    const userInput = document.getElementById('userInput').value;
    const sessionId = generateSessionId();
    fetch('http://localhost:3000/submit', {
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

function generateSessionId() {
    return 'session_' + Math.random().toString(36).substr(2, 9);
}


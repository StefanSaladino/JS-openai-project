document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        const userPrompt = document.getElementById('prompt').value;

        // Prompt the user for a password
        const password = window.prompt('Please enter your password:');

        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: userPrompt, password: password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = `<img src="${data.url}" alt="Generated Image" class="img-fluid">`;
                imageContainer.style.display = 'flex'; // Show the image container
            } else if (data.error === 'Incorrect password') {
                document.getElementById('errorContainer').innerText = 'Incorrect password.';
            } else {
                document.getElementById('errorContainer').innerText = 'An error occurred.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('errorContainer').innerText = 'An error occurred.';
        });
    });    
});

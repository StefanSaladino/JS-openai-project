document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission
        
        const prompt = document.getElementById('prompt').value;
    
        fetch('/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ inputs: prompt }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.url) {
                const imageContainer = document.getElementById('imageContainer');
                imageContainer.innerHTML = `<img src="${data.url}" alt="Generated Image" class="img-fluid">`;
                imageContainer.style.display = 'flex'; // Show the image container
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

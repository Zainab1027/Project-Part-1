const movie = require("../../server/model/movie");

// Immediately Invoked Function Expression to encapsulate code
(function () {
    // Load movies from the server

    async function loadObjects() {
        const response = await fetch('/movieslist');
        const movies = await response.json();

        const tableBody = document.querySelector('#objectsTable tbody');
        tableBody.innerHTML = ''; // Clear existing content

        movies.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${movies.title}</td>
                <td>${movies.genre}</td>
                <td>${movies.year}</td>
                <td>${movies.description}</td>
                <td>
                    <button onclick="editObject('${movies._id}')">Edit</button>
                    <button onclick="deleteObject('${movies._id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Show form for creating a new movie
    function showCreateForm() {
        document.getElementById('formTitle').innerText = 'Add New Movie';
        document.getElementById('objectForm').reset();
        document.getElementById('objectId').value = ''; // Clear movie for entries
        document.getElementById('formContainer').style.display = 'block';
    }

    // Show form for editing an existing movie
    async function editObject(id) {
        const response = await fetch(`/movieslist/${id}`);
        const movie = await response.json();

        document.getElementById('title').innerText = 'Edit Movie';
        document.getElementById('genre').value = movie.genre;
        document.getElementById('year').value = movie.year;
        document.getElementById('description').value = movie.description;
        document.getElementById('objectId').value = id;
        document.getElementById('formContainer').style.display = 'block';
    }

    // Close the form
    function closeForm() {
        document.getElementById('formContainer').style.display = 'none';
    }

    // Submit form for creating or updating a book
    async function submitForm(event) {
        event.preventDefault();
        const id = document.getElementById('objectId').value;

        const bookData = {
            title: document.getElementById('title').value,
            genre: document.getElementById('genre').value,
            year: document.getElementById('year').value,
            description: document.getElementById('description').value,
        };

        if (id) {
            // Update existing movie
            await fetch(`/movieslist/edit/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movieData)
            });
        } else {
            // Create new movie
            await fetch('/movieslist/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(movieData)
            });
        }

        loadObjects();
        closeForm();
    }

    // Delete a movie
    async function deleteObject(id) {
        await fetch(`/movieslist/delete/${id}`, { method: 'GET' });
        loadObjects();
    }

    // Load movies on page load
    window.addEventListener('load', loadObjects);

    // Expose functions to global scope for button access
    window.showCreateForm = showCreateForm;
    window.editObject = editObject;
    window.deleteObject = deleteObject;
    window.submitForm = submitForm;

})(); // Immediately runs this function, logging "I am private"

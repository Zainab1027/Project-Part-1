// Immediately Invoked Function Expression to encapsulate code
(function () {
    // Load books from the server

    async function loadObjects() {
        const response = await fetch('/bookslist');
        const books = await response.json();

        const tableBody = document.querySelector('#objectsTable tbody');
        tableBody.innerHTML = ''; // Clear existing content

        books.forEach((book, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${book.Name}</td>
                <td>${book.Author}</td>
                <td>${book.Published}</td>
                <td>${book.Description}</td>
                <td>${book.Price}</td>
                <td>
                    <button onclick="editObject('${book._id}')">Edit</button>
                    <button onclick="deleteObject('${book._id}')">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Show form for creating a new book
    function showCreateForm() {
        document.getElementById('formTitle').innerText = 'Add New Book';
        document.getElementById('objectForm').reset();
        document.getElementById('objectId').value = ''; // Clear book ID for new entries
        document.getElementById('formContainer').style.display = 'block';
    }

    // Show form for editing an existing book
    async function editObject(id) {
        const response = await fetch(`/bookslist/${id}`);
        const book = await response.json();

        document.getElementById('formTitle').innerText = 'Edit Book';
        document.getElementById('name').value = book.Name;
        document.getElementById('author').value = book.Author;
        document.getElementById('published').value = book.Published;
        document.getElementById('description').value = book.Description;
        document.getElementById('price').value = book.Price;
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
            Name: document.getElementById('name').value,
            Author: document.getElementById('author').value,
            Published: document.getElementById('published').value,
            Description: document.getElementById('description').value,
            Price: document.getElementById('price').value,
        };

        if (id) {
            // Update existing book
            await fetch(`/bookslist/edit/${id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
        } else {
            // Create new book
            await fetch('/bookslist/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bookData)
            });
        }

        loadObjects();
        closeForm();
    }

    // Delete a book
    async function deleteObject(id) {
        await fetch(`/bookslist/delete/${id}`, { method: 'GET' });
        loadObjects();
    }

    // Load books on page load
    window.addEventListener('load', loadObjects);

    // Expose functions to global scope for button access
    window.showCreateForm = showCreateForm;
    window.editObject = editObject;
    window.deleteObject = deleteObject;
    window.submitForm = submitForm;

})(); // Immediately runs this function, logging "I am private"

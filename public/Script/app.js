// immediately invoked function expression to encapsulate code
(function () {
    // Mock data storage - in a real application, this would come from the server
    let objects = []; // Replace with a real data source if connected to a backend

    // Function to load and display objects in the table
    function loadObjects() {
        const tableBody = document.querySelector('#objectsTable tbody');
        tableBody.innerHTML = ''; // Clear existing content

        objects.forEach((obj, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${obj.title}</td>
                <td>${obj.description}</td>
                <td>
                    <button onclick="editObject(${index})">Edit</button>
                    <button onclick="deleteObject(${index})">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Show form for creating a new object
    function showCreateForm() {
        document.getElementById('formTitle').innerText = 'Create New Object';
        document.getElementById('objectForm').reset();
        document.getElementById('objectId').value = ''; // Clear object ID for new entries
        document.getElementById('formContainer').style.display = 'block';
    }

    // Show form for editing an existing object
    function editObject(index) {
        const obj = objects[index];
        document.getElementById('formTitle').innerText = 'Edit Object';
        document.getElementById('title').value = obj.title;
        document.getElementById('description').value = obj.description;
        document.getElementById('objectId').value = index;
        document.getElementById('formContainer').style.display = 'block';
    }

    // Close the form
    function closeForm() {
        document.getElementById('formContainer').style.display = 'none';
    }

    // Submit form for creating or updating an object
    function submitForm(event) {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const id = document.getElementById('objectId').value;

        if (id) {
            // Update existing object
            objects[id] = { title, description };
        } else {
            // Create new object
            objects.push({ title, description });
        }

        loadObjects();
        closeForm();
    }

    // Delete an object
    function deleteObject(index) {
        objects.splice(index, 1); // Remove object from array
        loadObjects();
    }

    // Function to start when the page loads
    function start() {
        console.log("app started");
        loadObjects(); // Load and display objects on page load
    }

    // Attach start function to the window load event
    window.addEventListener("load", start);

    // Expose functions to global scope for button click access
    window.showCreateForm = showCreateForm;
    window.editObject = editObject;
    window.deleteObject = deleteObject;
    window.submitForm = submitForm;

})(); // Immediately runs this function, logging "I am private"

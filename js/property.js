const API_URL = "http://localhost:8080/api/properties";
let editFormData;

// Get data method
function getData() {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {

            response = JSON.parse(this.response)
            response.sort((a, b) => a.id - b.id);

            let html = "";
            response.forEach(user => {
                html += `
                              <tr>
                                <td>${user.id}</td>
                                <td>${user.adress}</td>
                                <td>${user.roomCount}</td>
                                <td>${user.size}</td>
                                <td>${user.floorCount}</td>
                                <td><button class="btn btn-primary" onclick="editDataCall(${user.id})">Edit</button></td>
                                <td><button class="btn btn-danger" onclick="deleteData(${user.id})">Delete</button></td>
                              </tr>
                                `;
            })
            document.getElementById("tbData").innerHTML = html;
            setMessage("Data listed");
        } else {
            setMessage("ERROR!");
        }
    });

    xhr.open("GET", API_URL);

    xhr.send();
}

getData();

// Set the message for form status
function setMessage(message) {
    document.getElementById("message").innerHTML = message;
}

// Edit data
function editDataCall(id) {

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
            response = JSON.parse(this.response)
            editFormData = response;
            setFormData(editFormData.adress, editFormData.roomCount, editFormData.size, editFormData.floorCount)
            setMessage("Please change the data")
        }
    })

    xhr.open("GET", `${API_URL}/${id}`);
    xhr.send();
}

function editData() {
    let formData = getFormData();
    formData['id'] = editFormData.id;
    formData = JSON.stringify(formData)

    let xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {

            alert("Data changed")
            location.reload();
        }
    })

    xhr.open("PUT", `${API_URL}/${editFormData.id}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(formData);

}

// Get form 
function getFormData() {
    return {
        id: document.getElementById("id").value,
        adress: document.getElementById("adress").value,
        roomCount: document.getElementById("roomCount").value,
        size: document.getElementById("size").value,
        floorCount: document.getElementById("floorCount").value,
    }
}

// Clear form
function clearFormData() {
    document.getElementById("adress").value = "";
    document.getElementById("roomCount").value = "";
    document.getElementById("size").value = "";
    document.getElementById("floorCount").value = "";
}

// Set form
function setFormData(adress, roomCount, size, floorCount) {
    document.getElementById("adress").value = adress;
    document.getElementById("roomCount").value = roomCount;
    document.getElementById("size").value = size;
    document.getElementById("floorCount").value = floorCount;
}

// Callled this function when user click on button
function submitForm() {
    if (!editFormData) addUser(); // If the editFormData is undefined then call addUser()
    else editData();
}

// Delete data
function deleteData(id) {

    const xhr = new XMLHttpRequest();

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4 && this.status === 200) {
            alert("Data destroyed");
            getData();
        }
    });

    xhr.open("DELETE", `${API_URL}/${id}`);

    xhr.send();
}

// Add data
function addUser() {

    let formData = getFormData();
    formData = JSON.stringify(formData)

    const xhr = new XMLHttpRequest();

    if (!adress || !roomCount || !size || !floorCount ) {
        alert("Empty information cannot be entered.");
        return;
      }

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert("Successfully added.")
            location.reload();
        }
    });

    xhr.open("POST", `${API_URL}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(formData);
}
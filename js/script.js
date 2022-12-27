
const API_URL = "http://localhost:8080/api/estateagents";
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
                                <td>${user.name}</td>
                                <td>${user.adress}</td>
                                <td>${user.phone}</td>
                                <td>${user.fax}</td>
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
            setFormData(editFormData.name, editFormData.adress, editFormData.phone, editFormData.fax)
            setSuccessMessage("Please change the data")
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
        name: document.getElementById("name").value,
        adress: document.getElementById("adress").value,
        phone: document.getElementById("phone").value,
        fax: document.getElementById("fax").value,
    }
}

// Clear form
function clearFormData() {
    document.getElementById("name").value = "";
    document.getElementById("adress").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("fax").value = "";
}

// Set form
function setFormData(name, adress, phone, fax) {
    document.getElementById("name").value = name;
    document.getElementById("adress").value = adress;
    document.getElementById("phone").value = phone;
    document.getElementById("fax").value = fax;
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

    if (!adress || !phone || !fax) {
        alert("Empty information cannot be entered.");
        return;
      }

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            alert("Successfully added.")
            clearFormData();
            getData();
        }
    });

    xhr.open("POST", `${API_URL}`);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.send(formData);
}
const LOGIN_API_URL = "http://localhost:8080/api/estateagents/login";

const form = document.getElementById("loginForm");
form.addEventListener("submit", event => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;

    if (!name || !phone) {
        setMessage("Please fill in all fields");
        return;
    }

    const xhr = new XMLHttpRequest();

    // Set the request body
    const requestBody = { name, phone };

    xhr.open("POST", LOGIN_API_URL);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = () => {
        if (xhr.readyState === 4) {
            // Get the response from the server
            const response = JSON.parse(xhr.responseText);

            // Check if the login is successful
            if (response.loginSuccessful) {

                setMessage("Successfully logged in!");
                location.href = "property.html"

            } else if (xhr.status === 401) {
                setMessage("Invalid name or phone");
            } else {
                setMessage("401 Unauthorized");
            }
        }
    };
    xhr.send(JSON.stringify(requestBody));
});

const setMessage = message => {
    document.getElementById("message").innerHTML = message;
}
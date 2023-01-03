function navigate() {
    User_name = document.getElementById("username").value;

    window.location ="kwitter_room.html";
    localStorage.setItem("name", User_name);
}


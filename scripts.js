const users = [
    { username: "AnupGamer", password: "anup123", isAdmin: true }
];

let loggedInUser = null;
let messages = [];

document.addEventListener("DOMContentLoaded", function() {
    const messageInput = document.getElementById("messageInput");
    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
});

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = users.find(user => user.username === username && user.password === password);
    if (user) {
        loggedInUser = user;
        showChatPage();
        if (user.isAdmin) {
            document.getElementById("adminPanelButton").style.display = "block";
        }
    } else {
        alert("Invalid username or password. Please try again.");
    }
}

function showAdminPanel() {
    document.getElementById("chatPage").style.display = "none";
    document.getElementById("adminPanel").style.display = "block";
}

function goBackToChat() {
    document.getElementById("chatPage").style.display = "block";
    document.getElementById("adminPanel").style.display = "none";
}

function showChatPage() {
    document.getElementById("loginPage").style.display = "none";
    document.getElementById("chatPage").style.display = "block";
    displayMessages();
}

function sendMessage() {
    const message = document.getElementById("messageInput").value;
    messages.push({ user: loggedInUser.username, message: message });
    displayMessages();
    document.getElementById("messageInput").value = "";
}

function displayMessages() {
    const chatMessages = document.getElementById("chatMessages");
    chatMessages.innerHTML = "";
    messages.forEach((msg, index) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.textContent = `${msg.user}: ${msg.message}`;

        // Add three dots button for edit, delete, and reply
        if (msg.user === loggedInUser.username) {
            const optionsButton = document.createElement("button");
            optionsButton.textContent = "⋮";
            optionsButton.classList.add("options-button");

            const optionsMenu = document.createElement("div");
            optionsMenu.classList.add("options-menu");

            const editButton = document.createElement("button");
            editButton.textContent = "Edit";
            editButton.onclick = () => editMessage(index);
            optionsMenu.appendChild(editButton);

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.onclick = () => deleteMessage(index);
            optionsMenu.appendChild(deleteButton);

            messageDiv.appendChild(optionsButton);
            messageDiv.appendChild(optionsMenu);
        } else {
            const replyButton = document.createElement("button");
            replyButton.textContent = "Reply";
            replyButton.onclick = () => replyToMessage(msg.user);
            messageDiv.appendChild(replyButton);
        }

        chatMessages.appendChild(messageDiv);
    });
}

function editMessage(index) {
    const newMessage = prompt("Enter new message:");
    if (newMessage !== null) {
        messages[index].message = newMessage;
        displayMessages();
    }
}

function deleteMessage(index) {
    messages.splice(index, 1);
    displayMessages();
}

function replyToMessage(username) {
    const replyMessage = prompt(`Reply to ${username}:`);
    if (replyMessage !== null) {
        messages.push({ user: loggedInUser.username, message: replyMessage });
        displayMessages();
    }
}

function showCreateUserForm() {
    document.getElementById("createUserForm").style.display = "block";
    document.getElementById("deleteUserForm").style.display = "none";
    document.getElementById("changePasswordForm").style.display = "none";
    populateUserList();
}

function showDeleteUserForm() {
    document.getElementById("createUserForm").style.display = "none";
    document.getElementById("deleteUserForm").style.display = "block";
    document.getElementById("changePasswordForm").style.display = "none";
    populateUserList();
}

function showChangePasswordForm() {
    document.getElementById("createUserForm").style.display = "none";
    document.getElementById("deleteUserForm").style.display = "none";
    document.getElementById("changePasswordForm").style.display = "block";
    populateUserList();
}

function populateUserList() {
    const userToDeleteSelect = document.getElementById("userToDelete");
    const userToChangePasswordSelect = document.getElementById("userToChangePassword");

    userToDeleteSelect.innerHTML = "";
    userToChangePasswordSelect.innerHTML = "";

    users.forEach(user => {
        const option = document.createElement("option");
        option.value = user.username;
        option.textContent = user.username;
        userToDeleteSelect.appendChild(option);
        userToChangePasswordSelect.appendChild(option.cloneNode(true));
    });
}

function createUser() {
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const isAdmin = document.getElementById("isAdmin").checked;
    users.push({ username: newUsername, password: newPassword, isAdmin: isAdmin });
    alert("User created successfully!");
}

function deleteUser() {
    const userToDelete = document.getElementById("userToDelete").value;
    const index = users.findIndex(user => user.username === userToDelete);
    if (index !== -1) {
        users.splice(index, 1);
        alert("User deleted successfully!");
        populateUserList();
    }
}

function changePassword() {
    const userToChangePassword = document.getElementById("userToChangePassword").value;
    const newPassword = document.getElementById("newPasswordForUser").value;
    const user = users.find(user => user.username === userToChangePassword);
    if (user) {
        user.password = newPassword;
        alert("Password changed successfully!");
    }
}

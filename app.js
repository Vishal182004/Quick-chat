// Connect to Socket.IO
const socket = io();

// DOM Elements
const usernameInput = document.getElementById('username');
const messageInput = document.getElementById('message-input');
const chatForm = document.getElementById('chat-form');
const messagesDiv = document.getElementById('messages');

// Get the current time
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Add message to the chat window
function addMessage(username, message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user' : 'other');

    const metaDiv = document.createElement('div');
    metaDiv.classList.add('meta');
    metaDiv.textContent = `${username} • ${getCurrentTime()}`;

    const contentDiv = document.createElement('div');
    contentDiv.classList.add('content');
    contentDiv.textContent = message;

    messageDiv.appendChild(metaDiv);
    messageDiv.appendChild(contentDiv);
    messagesDiv.appendChild(messageDiv);

    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Auto-scroll to the bottom
}

// Handle form submission
chatForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent the page from reloading

    const username = usernameInput.value.trim();
    const message = messageInput.value.trim();

    if (!username) {
        alert("Please enter your username!");
        return;
    }

    if (message) {
        addMessage(username, message, true); // Display the user's message
        socket.emit('chat message', { username, message }); // Send message to server
        messageInput.value = ''; // Clear the input
    }
});

// Listen for messages from the server
socket.on('chat message', ({ username, message }) => {
    addMessage(username, message);
});

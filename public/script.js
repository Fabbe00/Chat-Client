let usernameInput = document.getElementById("username")
let textInput = document.getElementById("text")
let messageList = document.getElementById("messageList")

let latestMessageId = 0

function getMessage() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = () => {
        if (xmlhttp.readyState === 4) {
            showMessage(xmlhttp.responseText)
        }
    };

    xmlhttp.open("GET", "http://localhost:3000/getMessage", true);

    xmlhttp.send();
};

function sendMessage() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", 'http://localhost:3000/sendMessage', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        message: textInput.value,
        username: usernameInput.value
    }))
}

function showMessage(messages) {
    messages = JSON.parse(messages)
    for (let i = latestMessageId; i < messages.length; i++) {
      if (messages[i]["id"] >= i) {
        msgDiv = document.createElement("div")
        msgDiv.className = "message"
  
        let usernameDiv = document.createElement("p");
        usernameDiv.innerHTML = messages[i]["username"]
        usernameDiv.className = "username"
  
        let messageDiv = document.createElement("p");
        messageDiv.innerHTML = messages[i]["message"]
  
        msgDiv.appendChild(usernameDiv)
        msgDiv.appendChild(messageDiv)
  
        messageList.appendChild(msgDiv)
  
        latestMessageId = messages[i]["id"]
      }
    }
  
  
  
  }

setInterval(getMessage, 500);
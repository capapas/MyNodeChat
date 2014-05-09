window.onload = function() {
 
    var messages = [];
    var nicknames = [];
    var socket = io.connect('http://localhost:3000');
    var field = document.getElementById("field");
    var name = document.getElementById("name");
    var sendButton = document.getElementById("send");
    var content = document.getElementById("content");
    
 
    socket.on('message', function (data) {
    console.log(data);
        if(data.message || data.username) {
            var html = '';
            if (data.username) {
                html += '<b>' + data.username + '</b> : ';
            }
            html += data.message + '<br />';
            content.innerHTML += html;
            content.scrollTop = content.scrollHeight;
        } else {
            console.log("There is a problem:", data);
        }
    });
 
    sendButton.onclick = function() {
        socket.emit('send', { message: field.value, username: name.value });
        field.value = "";
    };
    
    $("#content").scrollTop($("#content")[0].scrollHeight);
    
    $(document).ready(function() {
        $("#field").keyup(function(e) {
            if(e.keyCode == 13) {
                sendButton.click();
            }   
        });
    });
}

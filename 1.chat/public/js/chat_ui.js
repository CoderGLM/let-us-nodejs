function insertMessage(message) {
  $('#messages').append($('<div></div>').html(message));
}

function insertSysMessage(message) {
  insertMessage('<i>' + message + '</i>');
}

function processUserInput(app, socket) {
  var message = $('#send-message').val();
  var systemMessage = '';
  if (message.charAt(0) === '/') {
    systemMessage = app.processCommand(message);
    if (systemMessage) {
      insertMessage(systemMessage);
    }
  } else {
    app.sendMessage($('#room').text(), message);
    insertMessage(message);
    $('#messages').scrollTop($('#messages').prop('scrollHeight'));
  }
  $('#send-message').val('');
}

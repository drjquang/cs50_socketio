document.addEventListener('DOMContentLoaded', () => {
  // Connect to socket with dynamic address
  var socket = io.connect(location.protocol + '//' + document.domain + ':' + location.port);

  // When connected, assign click event for button
  socket.on('connect', () => {
    // TRANSMIT: Each button will trigger emitting event "submit vote"
    document.querySelectorAll('button').forEach(button => {
      button.onclick = () => {
        const selection = button.dataset.vote;
        socket.emit('submit vote', {'selection':selection});
      };
    });
    // RECEIVE: when a new vote is announced, add to result addEventListener
    socket.on('vote totals', data => {
      document.querySelector('#yes').innerHTML = data.yes;
      document.querySelector('#no').innerHTML = data.no;
      document.querySelector('#maybe').innerHTML = data.maybe;
    });
  });
});

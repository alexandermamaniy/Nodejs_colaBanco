var socket = io()

socket.on('connect', () => {
  console.log('nos conectamos al server')
})

socket.on('disconnect', () => {
  console.log('nos desconectamos del server')
})

var lbTickets = [
  document.querySelector('#lblTicket1'),
  document.querySelector('#lblTicket2'),
  document.querySelector('#lblTicket3'),
  document.querySelector('#lblTicket4')
]
var lbEscritorios = [
  document.querySelector('#lblEscritorio1'),
  document.querySelector('#lblEscritorio2'),
  document.querySelector('#lblEscritorio3'),
  document.querySelector('#lblEscritorio4')
]

socket.on('estadoActual', (data) => {
  actualizarHTML(data.ultimos4)
})

function actualizarHTML (ultimos4) {
  console.log(ultimos4)
  for (var i = 0; i < ultimos4.length; i++) {
    lbTickets[i].textContent = `Ticket ${ultimos4[i].numero}`
    lbEscritorios[i].textContent = `Escritorio ${ultimos4[i].escritorio}`
  }
}

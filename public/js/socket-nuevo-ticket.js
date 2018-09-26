var socket = io()

let label = document.querySelector('#lblNuevoTicket')

socket.on('connect', () => {
  console.log('conectado al server')
})

socket.on('disconnect', () => {
  console.log('Desconectado del server')
})

socket.on('estadoActual', (data, callback) => {
  label.textContent = data.actual
  let resp = {
    ok: true,
    message: 'se cargo correctamente el ultimo ticket'
  }
  callback(resp)
})

document.querySelector('button').addEventListener('click', e => {
  socket.emit('siguienteTicket', null, (data) => {
    label.textContent = data
  })
})

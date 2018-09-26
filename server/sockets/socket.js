const { io } = require('../server')
const {TicketControl} = require('../classes/ticket-control')

const ticketControl = new TicketControl()

io.on('connection', (client) => {
  client.on('disconnect', () => {
    console.log('Usuario desconectado')
  })

  // Escuchar el cliente
  client.on('siguienteTicket', (data, callback) => {
    let siguiente = ticketControl.siguiente()
    callback(siguiente)
  })

  client.emit('estadoActual', {
    actual: ticketControl.getUltimoTicket(),
    ultimos4: ticketControl.getUltimo4()
  }, (message) => {
    console.log(message)
  })

  client.on('atenderTicket', (data, callback) => {
    if (!data.escritorio) {
      let resp = {
        err: true,
        message: 'El escritorio es necesario'
      }
      return resp
    }

    let atenderTicket = ticketControl.atenderTicket(data.escritorio)
    callback(atenderTicket)

    client.broadcast.emit('estadoActual', {
      actual: ticketControl.getUltimoTicket(),
      ultimos4: ticketControl.getUltimo4()
    })
  })
})

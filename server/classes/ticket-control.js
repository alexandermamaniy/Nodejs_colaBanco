
const fs = require('fs')

class Ticket {
  constructor (numero, escritorio) {
    this.numero = numero
    this.escritorio = escritorio
  }
}

class TicketControl {
  constructor () {
    this.hoy = new Date().getDate()
    this.tickets = []
    this.ultimos4 = []
    let data = require('../data/data.json')

    if (data.hoy === this.hoy) {
      this.ultimo = data.ultimo
      this.tickets = data.tickets
      this.ultimos4 = data.ultimos4
    } else {
      this.reiniciarConteo()
    }
  }

  reiniciarConteo () {
    this.tickets = []
    this.ultimos4 = []
    this.ultimo = 0
    console.log('Se h reinicado el conteo')
    this.grabarArchivo()
  }

  siguiente () {
    this.ultimo += 1
    let ticket = new Ticket(this.ultimo, null)
    this.tickets.push(ticket)

    this.grabarArchivo()

    return `Ticket ${this.ultimo}`
  }

  atenderTicket (escritorio) {
    if (this.tickets.length === 0) {
      return 'No hay tickets'
    }

    let numeroTicket = this.tickets[0].numero
    // eliminamos el 1er elemnto del array
    this.tickets.shift()
    // agregamos un elemento a la 1ra posicion del array
    let atenderTicket = new Ticket(numeroTicket, escritorio)
    this.ultimos4.unshift(atenderTicket)

    if (this.ultimos4.length > 4) {
      // borra el ultimo elemento
      this.ultimos4.splice(-1, 1)
    }

    this.grabarArchivo()

    return atenderTicket
  }

  getUltimoTicket () {
    return `Ticket ${this.ultimo}`
  }

  getUltimo4 () {
    return this.ultimos4
  }

  grabarArchivo () {
    let jsonData = {
      ultimo: this.ultimo,
      hoy: this.hoy,
      tickets: this.tickets,
      ultimos4: this.ultimos4
    }

    let jsonDataString = JSON.stringify(jsonData)

    fs.writeFileSync('./server/data/data.json', jsonDataString)
  }
}

module.exports = {
  TicketControl
}

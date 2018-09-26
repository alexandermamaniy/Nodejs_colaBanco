var socket = io()
var searchParams = new URLSearchParams(window.location.search)

socket.on('connect', () => {
  console.log('nos conectamos al server')
})

socket.on('disconnet', () => {
  console.log('nos desconectamos del server')
})

if (!searchParams.has('escritorio')) {
  window.location = 'index.html'
  throw new Error('El escrtorio es necesario')
}

var escritorio = searchParams.get('escritorio')
var tagEscritorio = document.querySelector('h1')
var buttonE = document.querySelector('button')
var small = document.querySelector('small')

tagEscritorio.textContent = `Escritorio ${escritorio}`

buttonE.addEventListener('click', function () {
  let dataSend = {
    escritorio: escritorio
  }
  socket.emit('atenderTicket', dataSend, function (resp) {
    if (resp === 'No hay tickets') {
      small.textContent = resp
      alert(resp)
      return
    }
    small.textContent = `Ticket ${resp.numero}`
  })
})

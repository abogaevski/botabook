export default function setEventStyle(event, el, view) {
  const color = event.extendedProps.eventColor
  const { isApproved } = event.extendedProps
  const statusColor = isApproved ? 'success' : 'danger'
  const statusText = isApproved ? 'Подтверждена' : 'Не подтверждена'
  const approvedStatusHtml = `<span class="ms-auto badge badge-light-${statusColor}">${statusText}</span>`

  // eslint-disable-next-line default-case
  switch (view.type) {
    case 'timeGridWeek':
    case 'timeGridDay':
      isApproved ? el.classList.add('event', `event-${color}`) : el.classList.add('event', `event-light-${color}`)
      break
    case 'listWeek':
    case 'listDay':
      el.querySelector('.fc-list-event-title a').classList.add('d-flex')
      el.querySelector('.fc-list-event-dot').classList.add(`border-${color}`)
      el.querySelector('.fc-list-event-title a').innerHTML += approvedStatusHtml
      break
    case 'dayGridMonth':
      el.querySelector('.fc-daygrid-event-dot').classList.add(`border-${color}`)
      break
  }
  // if (!isApproved) {
  //   switch (view.type) {
  //     case 'timeGridWeek':
  //       el.classList.add(`event-${color}`)
  //       break
  //
  //     case 'listWeek':
  //       el.getElementsByClassName('fc-list-event-dot')[0].classList.add(`border-${color}`)
  //       break
  //
  //     default:
  //       break
  //   }
  // } else {
  //   el.classList.add(`event-${color}`)
  // }
}
// if (view.type === 'timeGridWeek' || view.type === 'timeGridDay') {
//   // el.classList.add('bg-light-primary', 'border-primary')
//   // el.querySelector('.fc-event-main').classList.add('text-dark')
// } else if (view.type === 'listWeek') {
//   const dotEl = el.getElementsByClassName('fc-list-event-dot')[0]
//   el.querySelector('.fc-list-event-title')
//     .innerHTML += '<span class="ms-5 badge badge-light-danger">Не подтверждено</span>'
//   if (dotEl) {
//     dotEl.classList.add('border-danger')
//   }
// } else if (view.type === 'dayGridMonth') {
//   el.querySelector('.fc-daygrid-event-dot').classList.add('border-danger')
// }

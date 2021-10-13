import getEventStatus from '@/core/_utils/helpers/event-helpers/getEventStatus'

export default function setEventStyle(event, el, view) {
  const color = event.extendedProps.eventColor
  const statusInfo = getEventStatus(event.extendedProps.status)
  const approvedStatusHtml = `<span class="ms-auto badge badge-light-${statusInfo.color}">${statusInfo.name}</span>`

  // eslint-disable-next-line default-case
  switch (view.type) {
    case 'timeGridWeek':
    case 'timeGridDay':
      el.classList.add('event', `event-${color}`)
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
}

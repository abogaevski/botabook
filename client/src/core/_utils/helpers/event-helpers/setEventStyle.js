import getEventStatus from '@/core/_utils/helpers/event-helpers/getEventStatus'

export default function setEventStyle(event, el, view) {
  const color = event.extendedProps.eventColor
  const statusInfo = getEventStatus(event.extendedProps.status)
  const statusEl = document.createElement('span')
  statusEl.classList.add('badge', `badge-light-${statusInfo.color}`, 'event__status-badge', 'order-sm-1', 'mb-2', 'mb-sm-0', 'ms-0', 'ms-sm-auto')
  statusEl.textContent = statusInfo.name
  const titleEl = el.querySelector('.fc-list-event-title a')

  // eslint-disable-next-line default-case
  switch (view.type) {
    case 'timeGridWeek':
    case 'timeGridDay':
      el.classList.add('event', `event-${color}`)
      break
    case 'listWeek':
    case 'listDay':
      el.querySelector('.fc-list-event-title a').classList.add('d-flex', 'flex-column', 'flex-sm-row', 'align-items-start')
      el.querySelector('.fc-list-event-dot').classList.add(`border-${color}`)
      titleEl.prepend(statusEl)
      break
    case 'dayGridMonth':
      el.querySelector('.fc-daygrid-event-dot').classList.add(`border-${color}`)
      break
  }
}

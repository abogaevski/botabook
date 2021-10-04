export default function setEventStyle(event, el, view) {
  if (!event.extendedProps.isApproved) {
    if (view.type === 'timeGridWeek' || view.type === 'timeGridDay') {
      el.classList.add('bg-light-primary', 'border-primary')
      el.querySelector('.fc-event-main').classList.add('text-dark')
    } else if (view.type === 'listWeek') {
      const dotEl = el.getElementsByClassName('fc-list-event-dot')[0]
      el.querySelector('.fc-list-event-title')
        .innerHTML += '<span class="ms-5 badge badge-light-danger">Не подтверждено</span>'
      if (dotEl) {
        dotEl.classList.add('border-danger')
      }
    } else if (view.type === 'dayGridMonth') {
      el.querySelector('.fc-daygrid-event-dot').classList.add('border-danger')
    }
  }
}

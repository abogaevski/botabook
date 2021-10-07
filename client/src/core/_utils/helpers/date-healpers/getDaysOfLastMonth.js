import moment from 'moment'

export default function getDaysOfLastMonth() {
  let days = moment().daysInMonth()
  const result = []

  while (days) {
    const current = moment().date(days)
    result.push({
      fullDate: current,
      date: current.format('D'),
      name: current.format('dd')
    })
    days--
  }

  return result.reverse()
}

import moment from 'moment'

export default function getLastMonthsNamesListFromNow(monthsCount) {
  const now = moment()
  const startMonth = moment().subtract(monthsCount, 'month')
  const months = []
  let month = startMonth

  while (month.month() <= now.month()) {
    if (!months.includes(month.format('MMM'))) {
      months.push(month.format('MMM'))
    }
    month = month.clone().add(1, 'months')
  }
  return months
}

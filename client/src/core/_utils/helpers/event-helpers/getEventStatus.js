import { getCSSVariableValue } from '@/core/_utils/helpers/dom-helpers/_getCSSVariableValue'

export default function getEventStatus(id) {
  const statuses = [
    {
      color: 'primary',
      colorHEX: getCSSVariableValue('--bs-primary'),
      name: 'Новая'
    },
    {
      color: 'success',
      colorHEX: getCSSVariableValue('--bs-success'),
      name: 'Подтверждена'
    },
    {
      color: 'info',
      colorHEX: getCSSVariableValue('--bs-info'),
      name: 'Окончена'
    },
    {
      color: 'danger',
      colorHEX: getCSSVariableValue('--bs-danger'),
      name: 'Отменена'
    }
  ]
  if (id !== undefined) {
    return statuses[id]
  }
  return statuses
}

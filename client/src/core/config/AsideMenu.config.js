export const AsideMenuConfig = [
  {
    pages: [
      {
        heading: 'Дашборд',
        route: '/dashboard',
        svgIcon: '/media/icons/duotone/Design/PenAndRuller.svg'
      },
      {
        heading: 'Календарь',
        route: '/calendar',
        svgIcon: '/media/icons/duotone/Interface/Calendar.svg'
      }
    ]
  },
  {
    heading: 'Работа с профилем',
    pages: [
      {
        sectionTitle: 'Профиль',
        route: '/profile',
        svgIcon: '/media/icons/duotone/General/User.svg',
        sub: [
          {
            heading: 'Детали',
            route: '/profile/overview'
          },
          {
            heading: 'Настроки',
            route: '/profile/settings'
          }
        ]
      },
      {
        heading: 'Услуги',
        route: '/services',
        svgIcon: '/media/icons/duotone/Design/PenAndRuller.svg'
      }
    ]
  },
  {
    heading: 'Клиенты',
    pages: [
      {
        heading: 'Список',
        route: '/services/list',
        svgIcon: '/media/icons/duotone/Communication/Group.svg'
      },
      {
        heading: 'Kanban',
        route: '/services/board',
        svgIcon: '/media/icons/duotone/Communication/Group.svg'
      }
    ]
  }
]

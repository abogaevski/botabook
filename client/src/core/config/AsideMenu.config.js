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
            heading: 'Услуги',
            route: '/profile/projects'
          },
          {
            heading: 'Настройки',
            route: '/profile/settings'
          },
        ]
      }
    ]
  },
  {
    heading: 'Клиенты',
    pages: [
      {
        heading: 'Список',
        route: '/customer/list',
        svgIcon: '/media/icons/duotone/Communication/Group.svg'
      },
      // {
      //   heading: 'Kanban',
      //   route: '/customer/board',
      //   svgIcon: '/media/icons/duotone/Communication/Group.svg'
      // }
    ]
  }
]

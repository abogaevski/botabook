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
    heading: 'Настройки',
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
            heading: 'Настройки',
            route: '/profile/settings'
          },
        ]
      },
      {
        heading: 'Услуги',
        route: '/projects/list',
        svgIcon: '/media/icons/duotone/Interface/Briefcase.svg'
      },
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

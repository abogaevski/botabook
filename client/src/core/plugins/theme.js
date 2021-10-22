import { ToggleComponent } from '@/core/components/_ToggleComponent'
import { MenuComponent } from '@/core/components/MenuComponent'
import { ScrollComponent } from '@/core/components/_ScrollComponent'
import { DrawerComponent } from '@/core/_utils/_DrawerComponent'
import Theme from '@/core/_utils/_Theme'

Theme.init()
setTimeout(() => {
  ToggleComponent.bootstrap()
  MenuComponent.bootstrap()
  ScrollComponent.bootstrap()
  DrawerComponent.bootstrap()
}, 1)

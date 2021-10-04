import { ToggleComponent } from '@/core/components/_ToggleComponent'
import { MenuComponent } from '@/core/components/MenuComponent'
import { ScrollComponent } from '@/core/components/_ScrollComponent'

setTimeout(() => {
  ToggleComponent.bootstrap()
  MenuComponent.bootstrap()
  ScrollComponent.bootstrap()
}, 1)

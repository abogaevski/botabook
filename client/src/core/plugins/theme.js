import { ToggleComponent } from '@/core/components/_ToggleComponent'
import { MenuComponent } from '@/core/components/MenuComponent'
import { ImageInputComponent } from '@/core/components/_ImageInputComponent'

setTimeout(() => {
  ToggleComponent.bootstrap()
  MenuComponent.bootstrap()
  ImageInputComponent.bootstrap()
}, 1)

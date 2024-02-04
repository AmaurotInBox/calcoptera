import 'pinia'
import { Ws } from '../api/ws'

declare module 'pinia' {
  export interface PiniaCustomProperties {
    $ws: Ws
  }
}

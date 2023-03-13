import Takeoff from './media/takeoff.svg'
import Land from './media/land.svg'
import ModeIcon from './media/gear-white.svg'
import Navigate from './media/waypoint.svg'
import Arm from './media/Play.svg'
import Disarm from './media/Stop.svg'
import { RosJsMessage } from './ros/builtinTypes'
import { getService } from './ros/service'
import { FunctionComponent } from 'react'
 
export interface CopterAction {
  icon: FunctionComponent
  name: string
  text: (preparam: string) => string
  run: (params: RosJsMessage, preparam: string) => void
  show: (status: { armed: boolean; altitude: number }) => boolean
  preparam?: (tfs: string[]) => string[]
  param?: RosJsMessage
}

function callService(serviceName: string, params: RosJsMessage) {
  return getService(serviceName).then(
    (service) => new Promise((resolve) => service.callService(params, resolve))
  )
}

export const copterActions: CopterAction[] = [
  {
    icon: Arm,
    name: 'arm',
    text: () => 'to arm your copter',
    run: () => callService('/mavros/cmd/arming', { value: true }),
    show: ({ armed }) => !armed
  },
  {
    icon: Disarm,
    name: 'disarm',
    text: () => 'to disarm your copter',
    run: () => callService('/mavros/cmd/arming', { value: false }),
    show: ({ armed }) => armed
  },
  {
    icon: Takeoff,
    name: 'takeoff',
    text: () => 'to takeoff your copter',
    run: (params) =>
      callService('/navigate', {
        z: params.altitude,
        frame_id: 'body',
        auto_arm: true
      }),
    show: ({ altitude }) => altitude < 0.2,
    param: { altitude: 1 }
  },
  {
    icon: Land,
    name: 'land',
    text: () => 'to land your copter',
    run: () => callService('/land', {}),
    show: ({ altitude }) => altitude > 0.2
  },

  {
    icon: ModeIcon,
    name: 'mode',
    text: (preparam) => 'to change copter mode to ' + preparam,
    preparam: () => [
      'MANUAL',
      'STABILIZED',
      'POSCTL',
      'ACRO',
      'RATTITUDE',
      'ALTCTL',
      'OFFBOARD'
    ],
    run: (_, preparam) =>
      callService('/mavros/set_mode', { custom_mode: preparam }),
    show: ({ altitude }) => true
  },

  {
    icon: Navigate,
    name: 'navigate',
    text: (preparam) => 'to navigate from frame' + preparam,
    preparam: (tf) => tf,
    param: {
      x: 0,
      y: 0,
      z: 1
    },
    run: (params, preparam) =>
      callService('/navigate', {
        auto_arm: true,
        frame_id: preparam,
        ...params
      }),
    show: ({ altitude }) => true
  }
]

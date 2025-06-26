export interface ConeState {
  position: { x: number; y: number; z: number }
  rotation: { x: number; y: number; z: number }
  rotationSpeed?: number
  scale: { x: number; y: number; z: number }
  color: number
  visible: boolean
  name: string
  radius: number
  height: number
  radialSegments: number
}



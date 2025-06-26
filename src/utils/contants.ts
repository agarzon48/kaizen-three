import type { BoxState, SphereState, ConeState } from '@/domain/geometries';

export const DEFAULT_BOX_STATE: BoxState = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  rotationSpeed: 0,
  scale: { x: 1, y: 1, z: 1 },
  color: 0x00ff00,
  visible: true,
  name: 'default-box',
}

export const DEFAULT_SPHERE_STATE: SphereState = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  rotationSpeed: 0,
  scale: { x: 1, y: 1, z: 1 },
  color: 0xff0000,
  visible: true,
  name: 'default-sphere',
  radius: 1,
  widthSegments: 32,
  heightSegments: 32,
}

export const DEFAULT_CONE_STATE: ConeState = {
  position: { x: 0, y: 0, z: 0 },
  rotation: { x: 0, y: 0, z: 0 },
  rotationSpeed: 0,
  scale: { x: 1, y: 1, z: 1 },
  color: 0x0000ff,
  visible: true,
  name: 'default-cone',
  radius: 1,
  height: 2,
  radialSegments: 32,
}

export const typeDefaultsMap: Record<string, BoxState | SphereState | ConeState> = {
  box: DEFAULT_BOX_STATE,
  sphere: DEFAULT_SPHERE_STATE,
  cone: DEFAULT_CONE_STATE,
}
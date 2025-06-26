import * as THREE from 'three'
import { GeometryFactory } from './domain/geometries/geometryFactory'
import { LightFactory } from './domain/lights/lightFactory'

export function createSceneObjects(scene: THREE.Scene) {
    const boxGeometry = GeometryFactory.create({
        type: 'box',
        color: 0x00ff00,
        size: 1,
        position: { x: 0, y: 0, z: 0 }
    })
    scene.add(boxGeometry)

    const sphereGeometry = GeometryFactory.create({
        type: 'sphere',
        color: 0xff0000,
        size: 1,
        position: { x: 2, y: 0, z: 0 }
    })
    scene.add(sphereGeometry)

    const coneGeometry = GeometryFactory.create({
        type: 'cone',
        color: 0x0000ff,
        size: 1,
        position: { x: -2, y: 0, z: 0 }
    })
    scene.add(coneGeometry)

    // Create a directional light using the LightFactory
    const directionalLight = LightFactory.create({
        type: 'directional',
        color: 0xffffff,
        intensity: 1,
        position: { x: 0, y: 1, z: 1 }
    })
    scene.add(directionalLight)

    // Create a point light using the LightFactory
    const pointLight = LightFactory.create({
        type: 'point',
        color: 0xffd700,
        intensity: 10,
        position: { x: 2, y: 2, z: 2 }
    })
    scene.add(pointLight)
}

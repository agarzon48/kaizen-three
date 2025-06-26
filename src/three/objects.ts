import * as THREE from 'three'
import { LightFactory } from './domain/lights/lightFactory'

export function createSceneObjects(scene: THREE.Scene) {
    const directionalLight = LightFactory.create({
        type: 'directional',
        color: 0xffffff,
        intensity: 1,
        position: { x: 0, y: 1, z: 1 }
    })
    scene.add(directionalLight)

    const pointLight = LightFactory.create({
        type: 'point',
        color: 0xffd700,
        intensity: 10,
        position: { x: 2, y: 2, z: 2 }
    })
    scene.add(pointLight)
}

import * as THREE from 'three'

export type LightType = 'directional' | 'point' | 'ambient'

export interface LightOptions {
    type: LightType
    color?: number
    intensity?: number
    position?: { x: number; y: number; z: number }
}

export class LightFactory {
    static create(options: LightOptions): THREE.Light {
        const {
            type,
            color = 0xffffff,
            intensity = 1,
            position = { x: 0, y: 1, z: 1 },
        } = options

        let light: THREE.Light

        switch (type) {
            case 'directional':
                light = new THREE.DirectionalLight(color, intensity)
                break
            case 'point':
                light = new THREE.PointLight(color, intensity)
                break
            case 'ambient':
                light = new THREE.AmbientLight(color, intensity)
                break
            default:
                throw new Error(`Unsupported light type: ${type}`)
        }

        if ('position' in light) {
            light.position.set(position.x, position.y, position.z)
        }

        return light
    }
}

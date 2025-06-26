import * as THREE from 'three'

const textureLoader = new THREE.TextureLoader()
const occlusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg', (texture) => {
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(4, 4)
})

export type GeometryType = 'box' | 'sphere' | 'cone'

export interface GeometryOptions {
    type: GeometryType
    color?: number
    size?: number
    position?: { x: number; y: number; z: number }
}

export class GeometryFactory {
    static create(options: GeometryOptions): THREE.Mesh {
        const { type, color = 0x00ff00, size = 1, position = { x: 0, y: 0, z: 0 } } = options

        let geometry: THREE.BufferGeometry
        const material = new THREE.MeshStandardMaterial({ 
            map:occlusionTexture
         })

         console.log(111, occlusionTexture)

        switch (type) {
            case 'box':
                geometry = new THREE.BoxGeometry(size, size, size)
                break
            case 'sphere':
                geometry = new THREE.SphereGeometry(size / 2, 32, 32)
                break
            case 'cone':
                geometry = new THREE.ConeGeometry(size / 2, size, 32)
                break
            default:
                throw new Error(`Unsupported geometry type: ${type}`)
        }

        const mesh = new THREE.Mesh(geometry, material)
        mesh.position.set(position.x, position.y, position.z)
        return mesh
    }
}

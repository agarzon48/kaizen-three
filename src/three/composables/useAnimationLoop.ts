import * as THREE from 'three'

import { useThreeStore } from '@/stores/threeStore'

export function useAnimationLoop({
    renderer,
    scene,
    camera,
}: {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.Camera
}) {
    const store = useThreeStore()

    let animationFrameId: number

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate)
        scene.traverse((object) => {
            if (
                object instanceof THREE.Mesh &&
                object.name &&
                store.geometries[object.name]
            ) {
                const geometry = store.geometries[object.name]
                const speed = geometry.rotationSpeed ?? 0

                object.rotation.x += speed / 2
                object.rotation.y += speed

                geometry.rotation.x = object.rotation.x
                geometry.rotation.y = object.rotation.y
                geometry.rotation.z = object.rotation.z
            }
        })

        renderer.render(scene, camera)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
}

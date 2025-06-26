import * as THREE from 'three'

export function useAnimationLoop({
    renderer,
    scene,
    camera,
}: {
    renderer: THREE.WebGLRenderer
    scene: THREE.Scene
    camera: THREE.Camera
}) {

    let animationFrameId: number

    const animate = () => {
        animationFrameId = requestAnimationFrame(animate)
        scene.traverse((object) => {
            if (
                object instanceof THREE.Mesh
            ) {

                object.rotation.x += 0.02
                object.rotation.y += 0.02

            }
        })
        renderer.render(scene, camera)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
}

import * as THREE from 'three'

import { useThreeStore } from '@/stores/threeStore'

import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.update();



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
        
        controls.update();
        renderer.render(scene, camera)
    }

    animate()

    return () => cancelAnimationFrame(animationFrameId)
}

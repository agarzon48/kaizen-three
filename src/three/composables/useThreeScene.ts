import * as THREE from 'three'
import { createSceneObjects } from '../objects'

export function useThreeScene(container: HTMLElement) {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xffffff)

    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight)
    camera.position.z = 5
    scene.add(camera)

    const renderer = new THREE.WebGLRenderer({ canvas: container, antialias: true })
    renderer.setSize(800, 600)

    createSceneObjects(scene)

    return { scene, camera, renderer }
}

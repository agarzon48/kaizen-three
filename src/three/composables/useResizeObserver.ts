import * as THREE from 'three'

export function useResizeObserver(
    container: HTMLElement,
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera
) {
    const observer = new ResizeObserver(() => {
        const width = container.clientWidth
        const height = container.clientHeight
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height)
    })

    observer.observe(container)
}

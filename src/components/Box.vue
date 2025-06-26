<script setup lang="ts">
import * as THREE from 'three'
import { computed, watchEffect, onMounted, onUnmounted, watch } from 'vue'
import { useThreeStore } from '@/stores/threeStore'

const textureLoader = new THREE.TextureLoader()
const colorTexture = textureLoader.load('/textures/door/color.jpg')
const occlusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

const props = defineProps<{ id: string }>()
const emit = defineEmits<{
    (e: 'hover', id: string): void
    (e: 'click', id: string): void
}>()
const box = computed(() => three.geometries[props.id])

const three = useThreeStore()
const boxState = computed(() => three.geometries[props.id])

let mesh: THREE.Mesh | null = null
let isHovered = false

watchEffect(() => {
    if (!boxState.value || mesh) return

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshStandardMaterial({
        map: colorTexture,
        aoMap: occlusionTexture,
        alphaMap: alphaTexture,
        displacementMap: heightTexture,
        displacementScale: 0.1,
        normalMap: normalTexture,
        metalnessMap: metalnessTexture,
        roughnessMap: roughnessTexture,
        transparent: true
    })
    mesh = new THREE.Mesh(geometry, material)
    mesh.name = props.id
    three.scene?.add(mesh)
})

watchEffect(() => {
    if (!boxState.value || !mesh) return

    mesh.visible = boxState.value.visible
    mesh.position.set(
        boxState.value.position.x,
        boxState.value.position.y,
        boxState.value.position.z
    )
    mesh.rotation.set(
        boxState.value.rotation.x,
        boxState.value.rotation.y,
        boxState.value.rotation.z
    )
    mesh.scale.set(
        boxState.value.scale.x,
        boxState.value.scale.y,
        boxState.value.scale.z
    )
        ; (mesh.material as THREE.MeshStandardMaterial).color.set(boxState.value.color)
})

function updateMouse(event: MouseEvent) {
    const bounds = three.renderer?.domElement.getBoundingClientRect()
    if (!bounds) return
    three.mouse.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1
    three.mouse.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1
}

function checkIntersections() {
    if (!three.scene || !three.camera || !three.raycaster || !mesh) return

    three.raycaster.setFromCamera(three.mouse, three.camera)
    const intersects = three.raycaster.intersectObject(mesh)

    const hovering = intersects.length > 0
    if (hovering !== isHovered) {
        isHovered = hovering
        emit('hover', props.id)
    }
}

function handleClick() {
    if (!three.raycaster || !three.camera || !mesh) return

    three.raycaster.setFromCamera(three.mouse, three.camera)
    const intersects = three.raycaster.intersectObject(mesh)
    if (intersects.length > 0) {
        emit('click', props.id)
    }
}

onMounted(() => {
    window.addEventListener('mousemove', updateMouse)
    window.addEventListener('click', handleClick)
    three.renderer?.setAnimationLoop(checkIntersections)
})

watch(() => three.scene, (scene) => {
    if (mesh && scene) {
        scene.add(mesh)
    }
}, { immediate: true })



onUnmounted(() => {
    if (mesh && three.scene) {
        three.scene.remove(mesh)
        mesh.geometry.dispose()
        mesh.material.dispose()
    }
    window.removeEventListener('mousemove', updateMouse)
    window.removeEventListener('click', handleClick)
    three.renderer?.setAnimationLoop(null)
})
</script>

<template></template>
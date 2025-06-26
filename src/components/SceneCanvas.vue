<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, provide } from 'vue'
import { useThreeScene } from '../three/composables/useThreeScene'
import { useAnimationLoop } from '../three/composables/useAnimationLoop'
import { useResizeObserver } from '../three/composables/useResizeObserver'
import { useThreeStore } from '../stores/threeStore'
import * as THREE from 'three'

const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
const container = ref<HTMLElement | null>(null)
let cleanup: (() => void) | null = null
const three = useThreeStore()

watch(container, (el) => {
    if (el) {
        const { renderer, scene, camera } = useThreeScene(el)
        const stopLoop = useAnimationLoop({ renderer, scene, camera })
        useResizeObserver(el, renderer, camera)

        three.setContext({ scene, camera, renderer, raycaster })

        cleanup = () => {
            stopLoop()
            renderer.dispose()
        }
    }
})

onUnmounted(() => {
    cleanup?.()
})

</script>

<template>
    <canvas ref="container" width="800" height="600"></canvas>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import SceneCanvas from './components/SceneCanvas.vue'
import Box from './components/Box.vue'
import Hud from './components/Hud.vue'
import { useThreeStore } from './stores/threeStore'

const three = useThreeStore()
const selectedGeometry = ref<string | null>(null)

onMounted(() => {
  three.registerGeometry('box1', {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    rotationSpeed: 0.01,
    scale: { x: 1, y: 1, z: 1 },
    visible: true,
    name: 'box1'
  })

  three.registerGeometry('box2', {
    position: { x: 3, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    rotationSpeed: 0,
    visible: true,
    name: 'box2'
  })

  three.registerGeometry('box3', {
    position: { x: -3, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    rotationSpeed: 0.05,
    scale: { x: 1.5, y: 1.5, z: 1.5 },
    color: 0x0000ff,
    visible: true,
    name: 'box3'
  })
})

const handleHover = (id: string) => {
  three.updateGeometry(id, { color: Math.floor(Math.random() * 0xffffff) })
}

const handleClick = (id: string) => {
  if (selectedGeometry.value === id) {
    selectedGeometry.value = null
    return
  }
  selectedGeometry.value = id
}

</script>

<template>
  <div class="w-full h-full">
    <SceneCanvas />

    <Box v-for="(geometry, id) in three.geometries" :key="id" :id="id" @hover="handleHover"
      @click="handleClick" />
      <Hud v-if="selectedGeometry" :id="selectedGeometry" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import SceneCanvas from './components/SceneCanvas.vue'
import Box from './components/Box.vue'
import { useThreeStore } from './stores/threeStore'

const three = useThreeStore()

onMounted(() => {
  three.registerGeometry('box1', {
    position: { x: 0, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    rotationSpeed: 0.01,
    scale: { x: 1, y: 1, z: 1 },
    color: 0x00ff00,
    visible: true,
    name: 'box1'
  })

  three.registerGeometry('box2', {
    position: { x: 3, y: 0, z: 0 },
    rotation: { x: 0, y: 0, z: 0 },
    scale: { x: 1, y: 1, z: 1 },
    rotationSpeed: 0,
    color: 0xff0000,
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

</script>

<template>
  <div class="w-full h-full">
    <SceneCanvas />

    <Box v-for="(geometry, id) in three.geometries" :key="id" :id="id" @hover="handleHover"
      @click="() => console.log(`click [${id}]`)" />
  </div>
</template>

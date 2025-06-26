<script setup lang="ts">
import { computed } from 'vue'
import { useThreeStore } from '@/stores/threeStore'

const props = defineProps<{ id: string }>()
const store = useThreeStore()

const state = computed(() => store.geometries[props.id])

const posX = computed({
    get: () => state.value?.position.x ?? 0,
    set: (val) => state.value && (state.value.position.x = val)
})
const posY = computed({
    get: () => state.value?.position.y ?? 0,
    set: (val) => state.value && (state.value.position.y = val)
})
const posZ = computed({
    get: () => state.value?.position.z ?? 0,
    set: (val) => state.value && (state.value.position.z = val)
})
const rotX = computed({
    get: () => state.value?.rotation.x ?? 0,
    set: (val) => state.value && (state.value.rotation.x = val)
})
const rotY = computed({
    get: () => state.value?.rotation.y ?? 0,
    set: (val) => state.value && (state.value.rotation.y = val)
})
const rotZ = computed({
    get: () => state.value?.rotation.z ?? 0,
    set: (val) => state.value && (state.value.rotation.z = val)
})
const rotationSpeed = computed({
    get: () => state.value?.rotationSpeed ?? 0,
    set: (val) => {
        if (state.value) state.value.rotationSpeed = val
    }
})
const scaleX = computed({
    get: () => state.value?.scale.x ?? 1,
    set: (val) => state.value && (state.value.scale.x = val)
})
const scaleY = computed({
    get: () => state.value?.scale.y ?? 1,
    set: (val) => state.value && (state.value.scale.y = val)
})
const scaleZ = computed({
    get: () => state.value?.scale.z ?? 1,
    set: (val) => state.value && (state.value.scale.z = val)
})
const hexColor = computed({
    get: () => '#' + (state.value?.color.toString(16).padStart(6, '0') ?? '00ff00'),
    set: (val: string) => {
        if (state.value) state.value.color = parseInt(val.replace('#', ''), 16)
    }
})
const visible = computed({
    get: () => state.value?.visible ?? true,
    set: (val: boolean) => {
        if (state.value) state.value.visible = val
    }
})

const reset = () => {
    store.resetGeometry(props.id)
}
</script>

<template>
    <div class="panel-wrapper">
        <div class="panel-wrapper__main">
        <h2 class="panel-wrapper__main-title">Control Panel</h2>

        <label class="panel-wrapper__id-label">ID: {{ id }}</label>

        <fieldset>
            <legend>Position</legend>
            <div>
                <input type="number" v-model.number="posX" placeholder="X" />
                <input type="number" v-model.number="posY" placeholder="Y" />
                <input type="number" v-model.number="posZ" placeholder="Z" />
            </div>
        </fieldset>

        <fieldset>
            <legend>Rotation</legend>
            <div>
                <input type="number" v-model.number="rotX" placeholder="X" />
                <input type="number" v-model.number="rotY" placeholder="Y" />
                <input type="number" v-model.number="rotZ" placeholder="Z" />
            </div>
        </fieldset>

        <fieldset>
            <legend>Rotation Speed</legend>
            <input type="range" min="0" max="0.1" step="0.001" v-model.number="rotationSpeed"/>
            <div>Speed: {{ rotationSpeed.toFixed(3) }}</div>
        </fieldset>

        <fieldset>
            <legend>Scale</legend>
            <div>
                <input type="number" v-model.number="scaleX" placeholder="X" />
                <input type="number" v-model.number="scaleY" placeholder="Y" />
                <input type="number" v-model.number="scaleZ" placeholder="Z" />
            </div>
        </fieldset>

        <div>
            <label>Color</label>
            <input type="color" v-model="hexColor"/>
        </div>

        <div>
            <label>
                <input type="checkbox" v-model="visible" />
                Visible
            </label>
        </div>
        <hr />
    <button @click="reset">
        Reset
    </button>
        </div>
    </div>
</template>

<style scoped>
.panel-wrapper {
    position: fixed;
    top: 10px;
    right: 10px;
    width: 300px;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    height: 80vh;
    z-index: 1000;
}

.panel-wrapper__main {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 80vh;
}

.panel-wrapper__main-title {
    font-size: 1.25rem;
    margin-bottom: 12px;
}

.panel-wrapper__id-label {
    display: block;
    font-weight: bold;
    margin-bottom: 8px;
}

.panel-wrapper fieldset {
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 8px;
    margin-bottom: 12px;
}

.panel-wrapper legend {
    font-weight: bold;
    padding: 0 8px;
}

.panel-wrapper input[type="number"],
.panel-wrapper input[type="color"],
.panel-wrapper input[type="range"] {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.panel-wrapper input[type="checkbox"] {
    margin-right: 8px;
}

.panel-wrapper button {
    width: 100%;
    padding: 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.panel-wrapper button:hover {
    background-color: #d32f2f;
}


</style>

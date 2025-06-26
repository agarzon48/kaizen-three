import { defineStore } from 'pinia'
import * as THREE from 'three'
import { toRaw } from 'vue'

import type { BoxState, SphereState, ConeState } from '@/domain/geometries'
import { typeDefaultsMap } from '@/utils/contants'

export type GeometryType = 'box' | 'sphere' | 'cone'

export const useThreeStore = defineStore('three', {
    state: () => ({
        scene: null as THREE.Scene | null,
        camera: null as THREE.Camera | null,
        renderer: null as THREE.WebGLRenderer | null,
        raycaster: null as THREE.Raycaster | null,
        mouse: new THREE.Vector2(),

        geometries: {} as Record<string, BoxState | SphereState | ConeState>,
        initialGeometries: {} as Record<string, BoxState | SphereState | ConeState>
    }),

    actions: {
        setContext({
            scene,
            camera,
            renderer,
            raycaster
        }: {
            scene: THREE.Scene
            camera: THREE.Camera
            renderer: THREE.WebGLRenderer
            raycaster: THREE.Raycaster
        }) {
            this.scene = scene
            this.camera = camera
            this.renderer = renderer
            this.raycaster = raycaster
        },

        registerGeometry(type: GeometryType, initial?: Partial<BoxState | SphereState | ConeState>) {
            const id = globalThis.crypto.randomUUID()

            const defaults = typeDefaultsMap[type] || {}
            const fullState = { ...defaults, ...initial }

            if (!this.geometries[id]) {
                this.geometries[id] = structuredClone(fullState)
                this.initialGeometries[id] = structuredClone(fullState)
            }
        },

        resetGeometry(id: string) {
            if (this.initialGeometries[id]) {
                const initialState = toRaw(this.initialGeometries[id])
                this.geometries[id] = structuredClone(initialState)
            }
        },

        updateGeometry(id: string, changes: Partial<BoxState | SphereState | ConeState>) {
            if (this.geometries[id]) {
                this.geometries[id] = { ...this.geometries[id], ...changes }
            }
        }
    }
})
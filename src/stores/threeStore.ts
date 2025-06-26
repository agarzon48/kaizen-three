import { defineStore } from 'pinia'
import * as THREE from 'three'

import type { BoxState, SphereState, ConeState } from '@/domain/geometries'
import { DEFAULT_BOX_STATE, DEFAULT_CONE_STATE, DEFAULT_SPHERE_STATE } from '@/utils/contants'


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

        registerGeometry(id: string, initial?: Partial<BoxState | SphereState | ConeState>) {
            let defaults: BoxState | SphereState | ConeState

            if (initial && 'radius' in initial && 'height' in initial) {
                defaults = { ...DEFAULT_CONE_STATE }
            } else if (initial && 'radius' in initial) {
                defaults = { ...DEFAULT_SPHERE_STATE }
            } else {
                defaults = { ...DEFAULT_BOX_STATE }
            }

            const fullState = { ...defaults, ...initial }

            if (!this.geometries[id]) {
                this.geometries[id] = structuredClone(fullState)
                this.initialGeometries[id] = structuredClone(fullState)
            }
        },

        resetGeometry(id: string) {
            if (this.initialGeometries[id]) {
                this.geometries[id] = structuredClone(this.initialGeometries[id])
            }
        },

        updateGeometry(id: string, changes: Partial<BoxState | SphereState | ConeState>) {
            if (this.geometries[id]) {
                this.geometries[id] = { ...this.geometries[id], ...changes }
            }
        }
    }
})

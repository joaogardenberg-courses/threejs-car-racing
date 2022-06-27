import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

class Game {
  constructor() {
    this.init()
  }

  init() {
    const game = this

    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    this.camera.position.set(1, 1, 5)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    const ambient = new THREE.AmbientLight(0x707070)
    this.scene.add(ambient)

    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(0, 20, 10)
    this.scene.add(light)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)

    const loader = new FBXLoader()
    loader.load(
      '/car.fbx',
      (object) => {
        game.car = object
        game.scene.add(object)
        game.controls.target = object.position.clone()
        game.controls.update()

        object.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = child.receiveShadow = true
          }
        })

        game.animate()
      },
      null,
      console.error
    )
  }

  animate() {
    const game = this
    requestAnimationFrame(() => game.animate())

    this.renderer.render(this.scene, this.camera)
  }
}

const game = new Game()
window.game = game

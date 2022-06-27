import * as THREE from 'three'

class Game {
  constructor() {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    this.camera.position.z = 3

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(this.renderer.domElement)

    const ambient = new THREE.AmbientLight(0x707070)
    this.scene.add(ambient)

    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(0, 20, 10)
    this.scene.add(light)

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshPhongMaterial({ color: 0x00aaff })
    this.cube = new THREE.Mesh(geometry, material)
    this.scene.add(this.cube)

    this.animate()
  }

  animate() {
    const game = this
    requestAnimationFrame(() => game.animate())

    this.cube.rotation.x += 0.01
    this.cube.rotation.y += 0.01

    this.renderer.render(this.scene, this.camera)
  }
}

const game = new Game()
window.game = game

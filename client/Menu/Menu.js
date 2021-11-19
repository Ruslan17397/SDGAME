export default class Inventory extends Phaser.Scene {
    constructor() {
        super({ key: 'game-menu' });
    }
     preload() {
  // this.load.image('player','./Menu/assets/pngwing.png');
		// const renderer = this.game.renderer as Phaser.Renderer.WebGL.WebGLRenderer
		// this.customPipeline = renderer.addPipeline('Custom', new CustomPipeline(this.game))
		// this.customPipeline.setFloat1('resolution', this.scale.width)
		// this.customPipeline.setFloat1('radius', 1.0)
		// this.customPipeline.setFloat2('dir', 1.0, 1.0)
    }
    create() {
  //   	let pl = this.add.image(128, 128, 'player');
  //   	pl.setScale(0.1)

		// this.cameras.main.setRenderToTexture(this.customPipeline)
		// this.cameras.main.ignore(pl)
		//extracam.ignore(volcano)
    }

}
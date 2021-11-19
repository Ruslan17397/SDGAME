import Scene from './Scene.js';
import Inventory from './Inventory/inventory.js';
import MobileJoystick from './Control/MobileJoystick.js';
import Menu from './Menu/Menu.js';
let debug_mode = false;
let ph;
var config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: '#262626',
    parent: 'game_block',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: [Scene,Inventory,MobileJoystick,Menu]
};
ph = new Phaser.Game(config);
window.addEventListener('keyup', (e) => {
    if (e.key == 'q') {
        debug_mode = debug_mode ? false:true;
        ph.destroy()
        config.physics.arcade.debug = debug_mode;
        ph = new Phaser.Game(config);
    }
});
window.addEventListener('resize', function (event) {
ph.scale.resize(window.innerWidth, window.innerHeight);
ph.scene.start('game-ui');
}, false);
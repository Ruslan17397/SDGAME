let self;
export default class JoyStick extends Phaser.Scene {

    constructor() {
        super({ key: 'game-control' });
    }
    preload() {
        this.load.image('base', 'JoystickSplitted.png');
        this.load.image('thumb', 'SmallHandle.png');
    }
    create() {
        this.lastCursorDirection = "center";
        this.joystickConfig = {
            x: this.staticXJsPos,
            y: this.staticYJsPos,
            enabled: true
        };
        this.createVirtualJoystick();
        this.updateJoystickState();
    }

    getThis = (ph) => {
        self = ph;
    }
    //     base: this.add.circle(0, 0, 60, 0x888888).setDepth(999),
    // thumb: this.add.circle(0, 0, 30, 0xcccccc).setDepth(999),
    createVirtualJoystick() {
        const base = this.add.sprite(0, 0, 'base').setDepth(999);
        const thumb = this.add.sprite(0, 0, 'thumb').setDepth(999);
        base.setScale((120/base.height));
        console.log((60/thumb.height));
        thumb.setScale(0.6);
        this.pad = this.plugins.get('rexvirtualjoystickplugin');
        this.joyStick = this.pad.add(
            this, {
                x: 100,
                y: window.innerHeight - 100,
                radius: 60,
                base: base,
                thumb: thumb,
                dir: '8dir',
                forceMin: 16,
                enable: true
            }
        ).on('update', this.updateJoystickState, this);
        this.cursorKeys = this.joyStick.createCursorKeys();

        // this.input.on('pointerdown', pointer => {
        //     this.joyStick.x = pointer.x;
        //     this.joyStick.y = pointer.y;
        //     this.joyStick.base.x = pointer.x;
        //     this.joyStick.base.y = pointer.y;
        //     this.joyStick.thumb.x = pointer.x;
        //     this.joyStick.thumb.y = pointer.y;
        // });

        // this.input.on('pointerup', pointer => {
        //     this.joyStick.x = this.staticXJsPos;
        //     this.joyStick.y = this.staticYJsPos;
        //     this.joyStick.base.x = this.staticXJsPos;
        //     this.joyStick.base.y = this.staticYJsPos;
        //     this.joyStick.thumb.x = this.staticXJsPos;
        //     this.joyStick.thumb.y = this.staticYJsPos;
        //     this.lastCursorDirection = "center";
        // });

    }
    update() {
        this.updateJoystickState();
    }

    stopPlayerAnimations() {
        self.faune.anims.stop('faune-run-side');
        self.faune.anims.stop('faune-run-up');
        self.faune.anims.stop('faune-run-down');
    }

    movePlayer() {
        console.log(this.lastCursorDirection)
        if (this.lastCursorDirection == "up") {
            self.faune.setVelocity(0, -self.speed);
            if (!self.faune.anims.isPlaying)
                self.faune.anims.play('faune-run-up', true);
        } else if (this.lastCursorDirection == "down") {
            self.faune.setVelocity(0, self.speed);
            self.faune.anims.play('faune-run-down', true);
        } else if (this.lastCursorDirection == "right") {
            self.faune.setVelocity(self.speed, 0);
            self.faune.setFlipX(false);
            if (!self.faune.anims.isPlaying)
                self.faune.anims.play('faune-run-side', true);
        } else if (this.lastCursorDirection == "left") {
            self.faune.setVelocity(-self.speed, 0);
            self.faune.setFlipX(true);
            if (!self.faune.anims.isPlaying)
                self.faune.anims.play('faune-run-side', true);
        }else if(this.lastCursorDirection == "upleft"){
            self.faune.setVelocity(-self.speed, -self.speed);
        }else if(this.lastCursorDirection == "upright"){
            self.faune.setVelocity(self.speed, -self.speed);
        }else if(this.lastCursorDirection == "downleft"){
            self.faune.setVelocity(-self.speed, self.speed);
        }else if(this.lastCursorDirection == "downright"){
            self.faune.setVelocity(self.speed, self.speed);
        }else {
            this.stopPlayerAnimations();
            self.faune.setVelocity(0, 0);
        }
    }

    updateJoystickState() {
        let direction = '';
        for (let key in this.cursorKeys) {
            if (this.cursorKeys[key].isDown) {
                direction += key;
            }
        }

        if (direction.length == 0) {
            this.stopPlayerAnimations();
            self.faune.setVelocity(0, 0);
            return;
        }

        if (this.lastCursorDirection !== direction) {
            this.stopPlayerAnimations();
            self.faune.setVelocity(0, 0);
        }
        this.lastCursorDirection = direction;
        this.movePlayer();
    }

}
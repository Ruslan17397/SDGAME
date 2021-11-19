import Server from '../server/Server.js';

let inventoryItems = [];
let self;
export default class Inventory extends Phaser.Scene {
    constructor() {
        super({ key: 'game-ui' });        
    }

    create() {
        self = this;        
        this.Server = new Server();
        const invent = this.add.group({
            classtype: Phaser.GameObjects.Image,
            key: 'grid',
            quantity: 6
        });
     
        // this.cameras.main.fadeOut(600);
        // this.cameras.main.fadeIn(600);
        // x: window.innerWidth/2 - 64,
        // y: window.innerHeight/2 - 64
    


        
        Phaser.Actions.GridAlign(invent.getChildren(), {
            width: 6,
            height: 1,
            cellWidth: 64,
            cellHeight: 64,
            x: window.innerWidth / 2 - (2*64),
            y: window.innerHeight - 32
        });
  



    }
    render = (ph)=>{        
        inventoryItems.forEach((child,index)=>{
            console.log(self)
            self.load.image(child.id, `../textures/${child.texture}`);
            const itemImg = self.add.image(window.innerWidth / 2 - (3*64) + ((index+1) * 64),window.innerHeight - 36,inventoryItems[index].id);
            itemImg.angle = 36;
            itemImg.setScale(3);
        });

    }
    addItem = async (key, ph) => {
        const item = await ph.Server.requestData(`/game/api/inventory/get/${key}`);
        inventoryItems.push(item); 
        this.render(ph);       
    }

    initialization = async (ph) => {
        inventoryItems = await ph.Server.requestData('/game/api/inventory/get-all');
        this.render(ph)
    }


}
import { _decorator, Button, Component, instantiate, Node, Prefab } from 'cc';
import { MineItem } from './MineItem';
const { ccclass, property } = _decorator;

@ccclass('Mines')
export class Mines extends Component {
    @property({
        type : Node
    })
    mineParent:Node =null;

    @property({
        type : Prefab
    })
    item:Prefab =null;

    @property({
        type : Button
    })
    btnBet:Button =null;

    private mines:number = 0;
    private mineItem: MineItem = null;
    private totalSlots: number = 25;
    private mineCount: number = 5;

    start() {
        this.generateMineItem();
        
    }

    update(deltaTime: number) {
        
    }

    generateMineItem(){
        for(let i = 0; i< 25; i++){
            const itemNode = instantiate(this.item);
            this.mineParent.addChild(itemNode);
        }
        this.placeMinesAndGems();
    }

    destroyAllItem(){
        let children = this.mineParent.children;
        for (let i = children.length - 1; i >= 0; i--) {
            children[i].destroy();
        }
    }

    placeMinesAndGems() {
        // Create an array representing all slots
        let slots = new Array(this.totalSlots).fill('gem'); // Initially fill all with gems
        
        // Place mines randomly
        let placedMines = 0;
        while (placedMines < this.mineCount) {
            let randomIndex = Math.floor(Math.random() * this.totalSlots);
            if (slots[randomIndex] !== 'mine') {
                slots[randomIndex] = 'mine';
                placedMines++;
            }
        }

        // Now assign these to the slot nodes
        for (let i = 0; i < this.mineParent.children.length; i++) {
            let slotNode = this.mineParent.children[i];
            this.mineItem = slotNode.getComponent(MineItem);
            if (slots[i] === 'mine') {
                this.mineItem.setItemData("Mine");
            } else {
                this.mineItem.setItemData("Gem");
            }
        }
    }
}



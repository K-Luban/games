import { _decorator, Component, instantiate, Node, Prefab, randomRangeInt } from 'cc';
import { Eggs } from './Eggs';
import { MineItem } from './MineItem';
const { ccclass, property } = _decorator;

@ccclass('Dragon')
export class Dragon extends Component {

    @property({
        type : Prefab
    })
    egg:Prefab =null;

    @property({
        type : Node
    })
    eggParent : Node =null;

    start() {
        this.generateEggs();
    }

    update(deltaTime: number) {
        
    }

    generateEggs(){
        for(let i = 0; i< 18; i++){
            const eggNode = instantiate(this.egg);
            this.eggParent.addChild(eggNode);
        }
        this.placeEggsAndMines();
    }

    placeEggsAndMines() {
        let children = this.eggParent.children;
        for (let i = 0; i < children.length; i++) {
            // Each row has two slots, so calculate the indices
            let firstSlotIndex = i * 2;
            let secondSlotIndex = i * 2 + 1;

            // Randomly assign mine to either the first or second slot in the row
            let randomMineIndex = randomRangeInt(0, 2); // 0 or 1
            
            //children[firstSlotIndex].getComponent(Eggs).setItemData("Egg");
            if (randomMineIndex === 0) {
                children[firstSlotIndex].getComponent(Eggs).setItemData("Egg");
            } else {
                children[firstSlotIndex].getComponent(Eggs).setItemData("Skull");
            }

            if(randomMineIndex === 0){
                children[secondSlotIndex].getComponent(Eggs).setItemData("Skull");
            }else{
                children[secondSlotIndex].getComponent(Eggs).setItemData("Egg");
            }
        }
    }
}
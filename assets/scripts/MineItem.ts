import { _decorator, Button, Component, Node, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MineItem')
export class MineItem extends Component {

    @property({
        type : SpriteFrame
    })
    sprGem:SpriteFrame =null;

    @property({
        type : SpriteFrame
    })
    sprMine:SpriteFrame =null;

    @property({
        type : Sprite
    })
    sprItem:Sprite =null;

    @property({
        type : Node
    })
    frontCard:Node =null;

    protected onLoad(): void {
        let btnCard:Button = this.node.getComponent(Button);
        btnCard.node.on(Button.EventType.CLICK, this.onClickedCards, this);
    }

    start() {

    }

    update(deltaTime: number) {
        
    }

    public setItemData(itemName:string){
        if(itemName === "Gem"){
            this.sprItem.spriteFrame = this.sprGem;
        }else{
            this.sprItem.spriteFrame = this.sprMine;
        }
    }

    onClickedCards(){
        console.log("Clicked");
        tween(this.frontCard)
            .to(0.2, { scale: new Vec3(0, 0, 0) })
            .start();
        let btnCard:Button = this.node.getComponent(Button);
        btnCard.interactable = false;
    }
}



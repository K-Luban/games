import { _decorator, Button, Component, Node, Sprite, SpriteFrame, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Eggs')
export class Eggs extends Component {

    @property({
        type : SpriteFrame
    })
    sprEgg:SpriteFrame =null;

    @property({
        type : SpriteFrame
    })
    sprSkull:SpriteFrame =null;

    @property({
        type : Sprite
    })
    sprItem:Sprite =null;

    @property({
        type : Node
    })
    frontCard:Node =null;

    onLoad() {
        let btnCard:Button = this.node.getComponent(Button);
        btnCard.node.on(Button.EventType.CLICK, this.onClickedCards, this);
    }

    public setItemData(itemName:string){
        if(itemName === "Egg"){
            this.sprItem.spriteFrame = this.sprEgg;
        }else{
            this.sprItem.spriteFrame = this.sprSkull;
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



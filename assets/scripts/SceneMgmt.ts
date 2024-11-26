import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneMgmt')
export class SceneMgmt extends Component {

    @property({
        type : Button
    })
    btnDice : Button = null;

    @property({
        type : Button
    })
    btnCrash : Button = null;
    
    @property({
        type : Button
    })
    btnPlinko : Button = null;
    
    protected onLoad(): void {
        this.btnDice.node.on(Button.EventType.CLICK, this.onClickedbtnDice, this);
        this.btnCrash.node.on(Button.EventType.CLICK, this.onClickedbtnCrash, this);
        this.btnPlinko.node.on(Button.EventType.CLICK, this.onClickedbtnPlinko, this);    
    }

    onClickedbtnDice(){
        director.loadScene("Dice");
    }

    onClickedbtnCrash(){
        director.loadScene("Crash");
    }

    onClickedbtnPlinko(){
        director.loadScene("Plinko");
    }
}



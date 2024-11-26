import { _decorator, Button, Component, Label, Node, ScrollView, Slider, Sprite, TERRAIN_HEIGHT_BASE } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Dice')
export class Dice extends Component {
    @property({
        type : Slider
    })
    slider : Slider = null;

    @property({
        type : Sprite
    })
    sprFillBar : Sprite = null;

    @property({
        type : Label
    })
    lblUserChoose : Label = null;

    @property({
        type : Label
    })
    lblWinChance : Label = null;

    @property({
        type : Label
    })
    lblMultiplier : Label = null;

    @property({
        type : Label
    })
    lblResult : Label = null;

    @property({
        type : Label
    })
    lblStatus : Label = null;

    @property({
        type : Button
    })
    btnBet : Button = null;

    @property({
        type : Label
    })
    lblHistory : Label = null;

    private userBetNum :number = 0;

    onLoad() {
        this.btnBet.node.on(Button.EventType.CLICK, this.onClickedBtnBet, this);
        this.initUI();
        this.slider.node.on('slide', this.onSliderChanged, this);
    }

    onSliderChanged(slider: Slider) {
        this.sprFillBar.fillRange = slider.progress;
        let num: number = slider.progress * 100; // Example number
        let wholeNum: number = Math.floor(num); // Rounds down to the nearest whole number
        this.userBetNum = wholeNum;
        this.lblUserChoose.string  = wholeNum.toString();
        this.lblWinChance.string  = wholeNum + ".0000";
        this.lblMultiplier.string = this.calculateMultipiler(this.slider.progress);
    }

    initUI(){
        this.lblUserChoose.string  = (this.slider.progress*100).toString();
        this.lblWinChance.string = (this.slider.progress*100) + ".0000";
        this.lblMultiplier.string = this.calculateMultipiler(this.slider.progress);
    }

    calculateMultipiler(sliderValue : number){
        var minValue = 1;
        var maxValue = 50;
        let calculatedNumber = (minValue + sliderValue * (maxValue - minValue)).toFixed(4);
        return calculatedNumber;
    }

    generateDiceNum(){
        let randomNum = parseFloat((Math.random() * (100 - 1) + 1).toFixed(2));
        return randomNum;
    }

    onClickedBtnBet(){
        var randNum = this.generateDiceNum();
        this.lblResult.string = randNum.toString();
        if(+randNum <= this.userBetNum){
            this.lblStatus.string = "You won.";
        }else{
            this.lblStatus.string = "You lose.";
        }
        this.lblHistory.string += randNum.toString() + "\n";
    }
}   



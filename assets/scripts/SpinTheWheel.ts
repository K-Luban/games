import { _decorator, Button, Collider, Component, director, ICollisionEvent, Label, math, Node, tween, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SpinTheWheel')
export class SpinTheWheel extends Component {
    @property({
        type : Button
    })
    btnBet : Button = null;

    @property({
        type : Node
    })
    wheelNode : Node = null;

    @property({
        type : Node
    })
    tickerNode : Node = null;
    
    @property({
        type : Label
    })
    lblResult : Label = null;

    //probabilities: number[] = [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5]; // Probabilities for each segment
    private probabilities: number[] = [0, 0, 100, 0, 0, 0, 0, 0];

    private isSpinning: boolean = false;

    protected onLoad(): void {
        this.btnBet.node.on(Button.EventType.CLICK, this.onClickedBtnBet, this);
        
    }
    protected start(): void {
        
    }

    onClickedBtnBet() {
        if (this.isSpinning) return;
        this.isSpinning = true;
    
        this.lblResult.string = "Spinning";

        const targetSegment = this.calculateSegment();
        console.log("Selected Segment: ", targetSegment);
        const segmentAngle = 360 / this.probabilities.length;
        const randomOffset = Math.random() * segmentAngle;
        const targetAngle = (360 - (segmentAngle * targetSegment) + randomOffset);
    
        const fullRotations = 5;
        const totalRotation = (fullRotations * 360) + targetAngle;
        console.log('Total Rotation to achieve: ' + totalRotation);
    
        const spinDuration = 4;
    
        // Animate the wheel to rotate by the total calculated angle
        tween(this.wheelNode)
            .to(spinDuration, { angle: totalRotation }, { easing: 'cubicOut' })
            .call(() => {
                console.log("Spin Complete");
                this.wheelNode.angle = totalRotation % 360;
                this.isSpinning = false;
                this.showResult(targetSegment);
            })
            .start();
    }

    calculateSegment(): number {
        const ranVal = Math.random() * 100;
        console.log(ranVal + '__RandomVal');
        let sum = 0;
    
        for (let i = 0; i < this.probabilities.length; i++) {
            sum += this.probabilities[i];
            if (ranVal <= sum) {
                return i + 1; // Return the correct segment index (1-based)
            }
        }
    
        return 1;
    }

    showResult(segment: number) {
        if (this.lblResult) {
            this.lblResult.string = `Seg: ${segment}`;
        }
    }
}



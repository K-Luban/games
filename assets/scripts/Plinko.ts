import { _decorator, Button, Collider2D, Component, Contact2DType, instantiate, Node, Prefab, tween, Vec3, IPhysics2DContact } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Plinko')
export class Plinko extends Component {
    @property(Prefab)
    pegPrefab: Prefab = null;

    @property(Number)
    rows: number = 10;

    @property(Node)
    pegParent: Node = null;

    @property(Node)
    ballParent: Node = null;

    @property({
        type : Prefab
    })
    ballPrefab : Prefab = null;

    @property({
        type : Button
    })
    btnBet : Button = null;

    protected onLoad(): void {
        this.btnBet.node.on(Button.EventType.CLICK, this.onClickedbtnBet, this);
    }

    //private ballNode : Node = null;

    start() {
        this.generatePlinkoBoard();
    }

    generatePlinkoBoard() {
        const spacingX = 50; // Horizontal spacing between pegs
        const spacingY = 50; // Vertical spacing between rows
        const startX = -(this.rows / 2) * spacingX; // Start position for the first row
        console.log(startX);
    
        for (let row = 0; row < this.rows; row++) {
            // Start with 3 pegs at the top, and increase by 1 peg per row
            let numPegsInRow = 3 + row; 
            for (let col = 0; col < numPegsInRow; col++) {
                // Calculate the position for each peg
                const xPos = startX + col * spacingX + (spacingX / 2) * (this.rows - numPegsInRow);
                const yPos = -row * spacingY;
                const pegPosition = new Vec3(xPos, yPos, 0);
                //console.log(pegPosition+' xyz');
    
                // Instantiate and place the peg
                const pegNode = instantiate(this.pegPrefab);
                pegNode.setScale(0.5, 0.5, 0);
                pegNode.setPosition(pegPosition);
                this.pegParent.addChild(pegNode);
            }
        }
    }

    onClickedbtnBet() {
        const randomBinary = Math.round(Math.random()); // Either 0 or 1

        if (!this.ballPrefab) {
            console.error("Ball prefab is not assigned!");
            return;
        }
    
        if (!this.ballParent) {
            console.error("Ball parent node is not assigned!");
            return;
        }

        let spawnPoint = randomBinary == 0 ? new Vec3(-23, Math.random(), 0) : new Vec3(23, Math.random(), 0);
        const ballNode = instantiate(this.ballPrefab);
        ballNode.setPosition(spawnPoint);
        this.ballParent.addChild(ballNode);
    }  
}
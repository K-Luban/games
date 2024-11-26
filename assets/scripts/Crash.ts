import { _decorator, Component, Graphics, Label, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Crash')
export class Crash extends Component {
    @property(Graphics)
    public graph: Graphics = null;

    @property(Label)
    public label: Label = null; // Optional if you want to display the value.

    private currentValue: number = 0;
    private maxValue: number = 0; // The maximum value for the graph (e.g., 2x)
    private duration: number = 6; // Animation time in seconds
    private elapsedTime: number = 0;

    start() {
        this.graph.clear();
        this.maxValue = this.generateRandNum();
        console.log(this.maxValue);
    }

    generateRandNum(){
        let randomNum = parseFloat((Math.random() * (100 - 1) + 1).toFixed(2));
        return randomNum;
    }

    update(deltaTime: number) {
        this.elapsedTime += deltaTime;

        // Calculate the progress (from 0 to 1) over the specified duration
        const progress = this.elapsedTime / this.duration;

        // If we haven't reached the end, update the graph
        if (progress <= 1) {
            this.currentValue = this.easeOutCubic(progress) * this.maxValue;
            this.updateGraph(this.currentValue);

            if (this.label) {
                this.label.string = this.currentValue.toFixed(2) + 'x'; // Optional label update
            }
        }
    }

    // Function to draw or update the graph curve
    updateGraph(value: number) {
        this.graph.clear();

        // Draw the graph as per the value (for simplicity, using a linear example)
        const width = 500; // The width of the graph
        const height = 200; // The maximum height of the graph

        const x = (value / this.maxValue) * width; // X-axis is based on the value
        const y = (value / this.maxValue) * height; // Y-axis for the height of the graph

        this.graph.moveTo(0, 0); // Start from the bottom left
        this.graph.quadraticCurveTo(0, 0, x, y); // Draw the line to the current value point
        this.graph.stroke();
    }

    // Easing function for smooth animation (optional)
    easeOutCubic(t: number): number {
        return 1 - Math.pow(1 - t, 3);
    }
}



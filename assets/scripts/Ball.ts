import { _decorator, Collider, Collider2D, Component, CircleCollider2D, ICollisionEvent, IPhysics2DContact, Node, tween, Vec3, v2, Vec2, Contact2DType, PhysicsSystem2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {

    private startPosition: Vec3 = new Vec3(0, 0, 0);

    private bouncePath: string[] = ["L", "R", "L", "L", "L", "R", "L", "L", "R", "R"];
    
    start () {
        // Registering callback functions for a single collider
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        // Registering global contact callback functions
        if (PhysicsSystem2D.instance) {
            PhysicsSystem2D.instance.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        console.log('onBeginContact');
        //this.createBounceEffect();
    }

    createBounceEffect() {
        this.startPosition = this.node.position.clone(); // Clone the starting position of the ball

        let randomDirection = Math.random();

        let finalX = this.startPosition.x;
        let finalY = this.startPosition.y;
        console.log(finalX,finalY);

        tween(this.node)
        .to(0.5, {position: new Vec3(finalX+5, finalY+5, this.startPosition.z) })
        .start();  // Start the tween animation
    }
}



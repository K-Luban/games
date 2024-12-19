import { _decorator, Collider2D, Component, IPhysics2DContact, Node, Contact2DType, PhysicsSystem2D, Vec3, tween, EPhysics2DDrawFlags, Label, CircleCollider2D, Vec2, RigidBody2D } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {
    
    start() {
        const collider = this.getComponent(CircleCollider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
        }
    }

    onCollisionEnter(selfCollider: CircleCollider2D, otherCollider: CircleCollider2D) {
        const rigidbody = selfCollider.getComponent(RigidBody2D);

        if (rigidbody) {
            console.log("Rigidbody found");
            // Handle bounce using the physics system
            const velocity = rigidbody.linearVelocity;
            console.log("Velocity:", velocity);
            if (velocity) {
                const surfaceNormal = this.calculateCollisionNormal(otherCollider);
                const newVelocity = this.reflect(velocity, surfaceNormal);
                rigidbody.linearVelocity = newVelocity.multiplyScalar(0.8); // Apply damping
            }
        }
    }

    calculateCollisionNormal(otherCollider: Collider2D): Vec2 {
        return new Vec2(0, 1);
    }

    reflect(velocity: Vec2, normal: Vec2): Vec2 {
        // Reflect velocity around the normal
        const dot = velocity.dot(normal);
        return velocity.subtract(normal.multiplyScalar(2 * dot));
    }
}
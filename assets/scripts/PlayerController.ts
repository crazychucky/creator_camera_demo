
import { _decorator, Component, Vec3, Vec2, input, Node, Input, EventMouse, EventKeyboard, RigidBody, CCBoolean, CCFloat } from 'cc';
import { KeyCode } from 'cc';
const { ccclass, property } = _decorator;


enum DIR {
  FORWARD,
  BACKWARD,
  LEFT,
  RIGHT
}

let SPEED = 10

@ccclass('PlayerController')
export class PlayerController extends Component {
  /* class member could be defined like this */
  // dummy = '';

  /* use `property` decorator if your want the member to be serializable */
  // @property
  // serializableDummy = 0;

  @property({ type: Array(CCBoolean) })
  private _dirFlags = []

  @property({ type: Array(CCBoolean) })
  private _rotationFlags = []

  @property({ type: Node })
  private cameraNode = null


  start() {
    for (let key in DIR) {
      this._dirFlags[key] = false
      this._rotationFlags[key] = false
    }
  }


  onLoad() {
    // let gcs = document.getElementById("GameCanvas")
    // gcs && (gcs.style.cursor = "none")
    // director.getOpenGLView().setCursorVisible(false); 
    input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
  }

  onDestroy() {
    input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
  }

  onMouseMove(event: EventMouse) {
    let isInKeyControl = false
    for (let flag of this._rotationFlags) {
      if (flag == true) {
        isInKeyControl = true
        break
      }
    }
    if (isInKeyControl) {
      return
    }
    let dx = event.getDeltaX()
    let ea = new Vec3(this.node.eulerAngles)
    let ry = dx > 0 ? -1 : 1
    ea.y = ea.y + ry
    this.node.setRotationFromEuler(ea)

    let dy = event.getDeltaY()
    let rx = dy > 0 ? -1 : 1
    rx = rx * 0.3
    ea = new Vec3(this.cameraNode.eulerAngles)
    ea.x = ea.x + rx
    this.cameraNode.setRotationFromEuler(ea)
  }

  onKeyDown(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
      case KeyCode.KEY_A:
        this._dirFlags[DIR.LEFT] = true
        break;
      case KeyCode.KEY_D:
      case KeyCode.ARROW_RIGHT:
        this._dirFlags[DIR.RIGHT] = true
        break;
      case KeyCode.KEY_W:
      case KeyCode.ARROW_UP:
        this._dirFlags[DIR.FORWARD] = true
        break;
      case KeyCode.KEY_S:
      case KeyCode.ARROW_DOWN:
        this._dirFlags[DIR.BACKWARD] = true
        break;
      case KeyCode.KEY_Q:
        this._rotationFlags[DIR.LEFT] = true
        break;
      case KeyCode.KEY_E:
        this._rotationFlags[DIR.RIGHT] = true
        break;
      case KeyCode.KEY_Z:
        this._rotationFlags[DIR.FORWARD] = true
        break;
      case KeyCode.KEY_C:
        this._rotationFlags[DIR.BACKWARD] = true
        break;
      case KeyCode.KEY_X:
        {
          let ea = new Vec3(this.cameraNode.eulerAngles)
          ea.x = 0
          this.cameraNode.setRotationFromEuler(ea)
        }
        break;
    }
  }
  onKeyUp(event: EventKeyboard) {
    switch (event.keyCode) {
      case KeyCode.ARROW_LEFT:
      case KeyCode.KEY_A:
        this._dirFlags[DIR.LEFT] = false
        break;
      case KeyCode.KEY_D:
      case KeyCode.ARROW_RIGHT:
        this._dirFlags[DIR.RIGHT] = false
        break;
      case KeyCode.KEY_W:
      case KeyCode.ARROW_UP:
        this._dirFlags[DIR.FORWARD] = false
        break;
      case KeyCode.KEY_S:
      case KeyCode.ARROW_DOWN:
        this._dirFlags[DIR.BACKWARD] = false
        break;
      case KeyCode.KEY_Q:
        this._rotationFlags[DIR.LEFT] = false
        break;
      case KeyCode.KEY_E:
        this._rotationFlags[DIR.RIGHT] = false
        break;
      case KeyCode.KEY_Z:
        this._rotationFlags[DIR.FORWARD] = false
        break;
      case KeyCode.KEY_C:
        this._rotationFlags[DIR.BACKWARD] = false
        break;
    }
  }


  update(deltaTime: number) {
    let ea = new Vec3(this.node.eulerAngles)
    let radY = ea.y * Math.PI / 180
    let velocity = new Vec2(0, 0)
    if (this._dirFlags[DIR.FORWARD]) {
      velocity.x += Math.cos(radY) * SPEED
      velocity.y += Math.sin(radY) * SPEED
    }
    if (this._dirFlags[DIR.BACKWARD]) {
      let rad = radY + Math.PI
      velocity.x += Math.cos(rad) * SPEED
      velocity.y += Math.sin(rad) * SPEED
    }
    if (this._dirFlags[DIR.LEFT]) {
      let rad = radY + Math.PI * 0.5
      velocity.x += Math.cos(rad) * SPEED
      velocity.y += Math.sin(rad) * SPEED
    }
    if (this._dirFlags[DIR.RIGHT]) {
      let rad = radY - Math.PI * 0.5
      velocity.x += Math.cos(rad) * SPEED
      velocity.y += Math.sin(rad) * SPEED
    }
    if (velocity.x != 0) {
      let pos = this.node.getPosition()
      pos.z = pos.z + deltaTime * velocity.x
      this.node.setPosition(pos)
    }
    if (velocity.y != 0) {
      let pos = this.node.getPosition()
      pos.x = pos.x + deltaTime * velocity.y
      this.node.setPosition(pos)
    }

    if (this._rotationFlags[DIR.RIGHT]) {
      let ry = -1
      ea.y = ea.y + ry
      this.node.setRotationFromEuler(ea)
    }
    else if (this._rotationFlags[DIR.LEFT]) {
      let ry = 1
      ea.y = ea.y + ry
      this.node.setRotationFromEuler(ea)
    }
    else if (this._rotationFlags[DIR.FORWARD]) {
      ea = new Vec3(this.cameraNode.eulerAngles)
      let rx = 1
      ea.x = ea.x + rx
      this.cameraNode.setRotationFromEuler(ea)
    }
    else if (this._rotationFlags[DIR.BACKWARD]) {
      ea = new Vec3(this.cameraNode.eulerAngles)
      let rx = -1
      ea.x = ea.x + rx
      this.cameraNode.setRotationFromEuler(ea)
    }
  }
}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.0/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.0/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.0/manual/en/scripting/life-cycle-callbacks.html
 */

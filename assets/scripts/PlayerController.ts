
import { _decorator, Component, game, input, Input, EventMouse, EventKeyboard, RigidBody,CCBoolean } from 'cc';
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

    @property({ type: RigidBody })
    private rigidBody = null


    start () {
        for (let key in DIR) {
            this._dirFlags[key] = false
        }
    }


    onLoad () {
      // let gcs = document.getElementById("GameCanvas")
      // gcs && (gcs.style.cursor = "none")
        // director.getOpenGLView().setCursorVisible(false); 
        game.canvas.requestPointerLock()
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        input.on(Input.EventType.MOUSE_MOVE, this.onMouseMove, this);
        input.on(Input.EventType.MOUSE_DOWN, this.onMouseDown, this);
    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onMouseDown (event: EventMouse) {
          //隐藏鼠标
      if (event.getButton() === 2) {
        console.log("ddd");
        // let gcs = document.getElementById("GameCanvas")
        // gcs.requestPointerLock();//鼠标锁定-隐藏但还可进行操作
      }

      //显示鼠标
      if (event.getButton() === 0||event.getButton() === 1) {
          console.log("ddd");
          // window.document.exitPointerLock();//鼠标取消锁定-显示鼠标
      }
    }
    onMouseMove (event: EventMouse) {
      let dx = event.getDeltaX()
      let ro = this.node.getRotation()
      let rx = dx > 0 ? 1 :-1
      rx = rx*0.01
      // ro.x = ro.x + rx
      ro.y = ro.y + rx
      this.node.setRotation(ro)
      // console.log("X:" + event.getDeltaX())
      // console.log("Y:" + event.getDeltaY())
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.ARROW_LEFT:
            case KeyCode.KEY_A:
              console.log("AAAAAAAA")
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
        }
    }
    onKeyUp (event: EventKeyboard) {
        switch(event.keyCode) {
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
        }
    }


    update (deltaTime: number) {
        if(this._dirFlags[DIR.FORWARD]){
            let pos = this.node.getPosition()
            pos.z = pos.z - deltaTime*SPEED
            this.node.setPosition(pos)
        }
        if(this._dirFlags[DIR.BACKWARD]){
            let pos = this.node.getPosition()
            pos.z = pos.z + deltaTime*SPEED
            this.node.setPosition(pos)
        }
        if(this._dirFlags[DIR.LEFT]){
            let pos = this.node.getPosition()
            pos.x = pos.x - deltaTime*SPEED
            this.node.setPosition(pos)
        }
        if(this._dirFlags[DIR.RIGHT]){
            let pos = this.node.getPosition()
            pos.x = pos.x + deltaTime*SPEED
            this.node.setPosition(pos)
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

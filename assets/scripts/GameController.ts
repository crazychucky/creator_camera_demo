
import { _decorator, Component, CCBoolean, director } from 'cc';
const { ccclass, property } = _decorator;

let PASS_SCENE = "ending_scene"
@ccclass('GameController')
export class GameController extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: CCBoolean })
    private _inLoad:Boolean = false


    start () {
      this._inLoad = false
      // debug
      // PhysicsSystem.instance.debug = EPhysics2DDrawFlags.Aabb
        // [3]
    }

    onSuccess () {
        if(this._inLoad){
            return
        }
        this._inLoad = true
        director.loadScene(PASS_SCENE)
    }

    // update (deltaTime: number) {
    //     // [4]
    // }
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

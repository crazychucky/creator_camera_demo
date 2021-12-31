
import { _decorator, Component, director,CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = OnLevelPass
 * DateTime = Sat Dec 25 2021 21:40:36 GMT+0800 (香港标准时间)
 * Author = crazychucky
 * FileBasename = OnLevelPass.ts
 * FileBasenameNoExtension = OnLevelPass
 * URL = db://assets/scripts/OnLevelPass.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */

let TITLE_SCENE = "title_scene"
 
@ccclass('OnLevelPass')
export class OnLevelPass extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    @property({ type: CCBoolean })
    private _inLoad:Boolean = false

    start () {
      this._inLoad = false
        // [3]
    }

    onNext () {
        if(this._inLoad){
            return
        }
        this._inLoad = true
        director.loadScene(TITLE_SCENE)
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
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/zh/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/zh/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/zh/scripting/life-cycle-callbacks.html
 */

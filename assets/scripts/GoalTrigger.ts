
import { _decorator, Component,Collider,ITriggerEvent, Node } from 'cc';
import { GameController } from "./GameController"
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = GoalTrigger
 * DateTime = Wed Dec 22 2021 17:54:57 GMT+0800 (中国标准时间)
 * Author = crazychucky
 * FileBasename = GoalTrigger.ts
 * FileBasenameNoExtension = GoalTrigger
 * URL = db://assets/scripts/GoalTrigger.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/zh/
 *
 */
 
@ccclass('GoalTrigger')
export class GoalTrigger extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    @property({type:GameController})
    private gameController = null

    start () {
      let com = this.getComponent(Collider)
      com.on('onTriggerEnter', this.onTrigger, this)
      // [3]
    }

    private onTrigger (event: ITriggerEvent) {
      this.gameController.onSuccess()
      // TODO:call game success
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

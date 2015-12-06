/**
 * Created by caasjj on 11/15/15.
 */
'use strict'
import decorators from '../../main'
import template from './login.template.html!text'
const PRIV = new WeakMap()
@decorators.Component({
  selector: 'wh-auth-login'
})
@decorators.View({
  template: template
})
class WhAuthLoginController {
  constructor() {
    PRIV.set(this, 'A Private Value')
  }
  getPriv(){
    console.log( PRIV.get(WhAuthLoginController.instance) )
  }
}

export default WhAuthLoginController
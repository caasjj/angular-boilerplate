/**
 * Created by caasjj on 11/1/15.
 */
'use strict'

import decorators from '../../../app'
import template from './login.template.html!text'

@decorators.RouteConfig( 'main-auth.login', {
  url: '/main-login',
  template: template
} )
class LoginController {

  constructor() {
  }

}

export default LoginController

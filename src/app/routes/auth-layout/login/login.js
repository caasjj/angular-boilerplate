/**
 * Created by caasjj on 11/1/15.
 */
'use strict'

import {RouteConfig, Inject} from '../../../app'
import template from './login.template.html!text'

@RouteConfig( 'auth.login', {
  url: '/login',
  template: template
} )
class LoginController {

  constructor() {
  }

}

export default LoginController

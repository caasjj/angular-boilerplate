/**
 * Created by caasjj on 11/1/15.
 */
'use strict'

import decorators from '../../../app'
import template from './registration.template.html!text'

@decorators.RouteConfig( 'main-auth.registration', {
  url: '/main-registration',
  template: template
} )
class RegistrationController {
  constructor() {
    this.somedata = 'Registration'
  }
}

export default RegistrationController

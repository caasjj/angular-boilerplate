/**
 * Created by caasjj on 11/1/15.
 */
'use strict'

import {RouteConfig, Inject} from '../../../app'
import template from './registration.template.html!text'

@RouteConfig( 'auth.registration', {
  url: '/registration',
  template: template
} )
class RegistrationController {
  constructor() {
    this.somedata = 'Registration'
  }
}

export default RegistrationController

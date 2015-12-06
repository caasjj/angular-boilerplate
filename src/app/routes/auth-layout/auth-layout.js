/**
 * Created by caasjj on 11/1/15.
 */
'use strict'
import './login/login'
import './registration/registration'

import decorators from '../../app'
import Promise from 'bluebird'
import template from './auth-layout.template.html!text'

@decorators.RouteConfig('main-auth', {
  template: template,
  abstract: true,
  url: ''
})
class AuthController{}

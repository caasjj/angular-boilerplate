/**
 * Created by caasjj on 11/1/15.
 */
'use strict'

import './login/login'
import './registration/registration'

import {RouteConfig, Inject} from '../../app'
import Promise from 'bluebird'
import template from './auth-layout.template.html!text'

@RouteConfig('auth', {
  template: template,
  abstract: true,
  url: ''
})
class AuthController{}

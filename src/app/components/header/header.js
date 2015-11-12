/**
 * Created by caasjj on 11/3/15.
 */
'use strict'
import {Component, View, Inject} from '../../app'
import template from './header.template.html!text'
@Component({
  selector: 'header'
})

@View({
  template: template
})
@Inject('AuthService')
class Header {
  constructor (AuthService) {
    this.somedata = 'Header Component connected to View'
    this.currentUser = AuthService.getCurrentUser()
    this.badLogin = false
  }
}
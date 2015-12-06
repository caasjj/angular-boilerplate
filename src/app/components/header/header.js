/**
 * Created by caasjj on 11/3/15.
 */
'use strict'
import decorators from '../../app'
import template from './header.template.html!text'
@decorators.Component({
  selector: 'header'
})

@decorators.View({
  template: template
})

@decorators.Inject('AuthService')
class Header {
  constructor (AuthService) {
    this.somedata = 'Header Component connected to View'
    this.currentUser = AuthService.getCurrentUser()
    this.badLogin = false
  }
}
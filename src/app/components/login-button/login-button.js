import {Component, View, Inject} from '../../app'
import template from './login-button.template.html!text'

function _clearForm(form) {
  this.username = null
  this.password = null
  form.$setUntouched()
  form.$setPristine()
  this._isOpen = false
}

@Component( {
  selector: 'login-button'
} )

@View( {
  template: template,
  bindToController: {
    buttonDirection: '@',
    currentUser: '=',
    badLogin: '=badLogin',
  },
  link: function(scope, element) {
    if (scope.vm.buttonDirection === 'right') {
      element.addClass('direction-right')
    } else {
      element.addClass('direction-left')
    }
    angular.element(document).on('click', () => {
      scope.vm._isOpen = false
      scope.$apply()
    })
    element.on('click', ($event) => {
      $event.stopPropagation()
    })
  }
} )

@Inject('AuthService', '$timeout' )
class loginButtonController {

  constructor(AuthService, $timeout) {

    this.AuthService = AuthService
    this._timeout = $timeout
    this._isOpen = false
    this.label = "Login"
    this._submitted = false

  }

  toggle($event) {
    $event && $event.stopPropagation()
    this._isOpen = !this._isOpen
    this._submitted = false
  }

  login(form) {

    this._submitted = true
    if (!this._isOpen) {
      this._isOpen = true
      this._submitted = false
      return
    }
    if (!form.$valid || this.currentUser) return

    let credentials = {
      strategy: 'local',
      username: this.username,
      password: this.password
    }

    this.AuthService.login( credentials )
        .then( res => {
          this.currentUser = res.username
          _clearForm.call(this, form )
        } )
        .catch( (err) => {
          this.badLogin = true
          this._timeout( () => {
            this.badLogin = false
          }, 2500 )
        } )
  }

  logout(form) {
    this.currentUser = null
    _clearForm.call(this, form )
  }

  detectEnter($event, form) {
    if ($event.charCode === 13) {
      this.login(form)
    }
  }



}

export default loginButtonController
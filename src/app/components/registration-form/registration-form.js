import {Component, View, Inject} from '../../app'
import template from './registration-form.template.html!text'
@Component({
  selector: 'registration-form'
})
@View({
  template: template
})
@Inject('AuthService')
class RegistrationFormController {

  constructor(AuthService) {
    this.AuthService = AuthService
  }

  submit() {
    this.AuthService.register({
      email: this.email,
      password: this.password

    })
  }

}
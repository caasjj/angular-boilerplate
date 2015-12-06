import decorators from '../../app'
import template from './registration-form.template.html!text'
@decorators.Component({
  selector: 'registration-form'
})
@decorators.View({
  template: template
})
@decorators.Inject('AuthService')
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
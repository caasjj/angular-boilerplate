import './account/account'
import './account-detail/account-detail'

import decorators from '../../app'
import template from './app-layout.template.html!text'

@decorators.RouteConfig('app', {
  url: '',
  abstract: true,
  template: template
})

class Controller {}


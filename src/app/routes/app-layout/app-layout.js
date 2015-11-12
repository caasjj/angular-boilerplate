
import './account/account'
import './account-detail/account-detail'

import {RouteConfig} from '../../app'
import template from './app-layout.template.html!text'

@RouteConfig('app', {
  url: '',
  abstract: true,
  template: template
})

class Controller {}


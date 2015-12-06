import './login'
import './registration'
import './password-reset'

import decorators from '../main'
@decorators.RouteConfig('wh-auth', {
  url: '',
  abstract: true,
  template: `<div ui-view="wh-auth" class="wh-auth-view"></div>`
})
class WhAuthRouteController {
}

export default WhAuthRouteController
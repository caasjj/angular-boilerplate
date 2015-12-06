import decorators from '../../app'

import template401 from './401.template.html!text'
import template403 from './403.template.html!text'
import template404 from './404.template.html!text'
import template500 from './500.template.html!text'

@decorators.RouteConfig('401', {
   url: '/401',
   template: template401
})
@decorators.RouteConfig('403', {
  url: '/403',
  template: template403
})
@decorators.RouteConfig('404', {
  url: '/404',
  template: template404
})
@decorators.RouteConfig('500', {
  url: '/500',
  template: template500
})
class Error {
}

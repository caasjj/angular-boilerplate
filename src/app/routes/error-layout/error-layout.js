import {RouteConfig} from '../../app'

import template401 from './401.template.html!text'
import template403 from './403.template.html!text'
import template404 from './404.template.html!text'
import template500 from './500.template.html!text'

@RouteConfig('401', {
   url: '/401',
   template: template401
})
@RouteConfig('403', {
  url: '/403',
  template: template403
})
@RouteConfig('404', {
  url: '/404',
  template: template404
})
@RouteConfig('500', {
  url: '/500',
  template: template500
})
class Error {
}

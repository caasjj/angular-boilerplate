import decorators from '../main'

@decorators.RouteConfig('wh-auth.login', {
  url: '/login',
  views: {
    'wh-auth@wh-auth': {
      template: `<wh-auth-login></wh-auth-login>`
    }
  }
})
class LoginRouteController {
}

export default LoginRouteController
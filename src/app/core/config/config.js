/**
 * Created by caasjj on 11/2/15.
 */
'use strict'
import decorators from '../../app'

class AppConfig {
  @decorators.Config()
  @decorators.Inject( '$locationProvider', '$urlRouterProvider' )
  static configFactory($locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode( {
      enabled: true,
      requireBase: false
    } )

    // for any unmatched url, send to 404 page (Not page found)
    $urlRouterProvider.otherwise('/404');


  }
}

class AppRun {
  @decorators.Run()
  @decorators.Inject('$rootScope')
  static runFactory($rootScope) {
    //$state.transitionTo('app.account')
    $rootScope.$on("$stateChangeError", console.log.bind(console));
  }
}

/**
 * Created by caasjj on 11/2/15.
 */
'use strict'
import {Config, Run, Inject} from '../../app'

class AppConfig {
  @Config()
  @Inject( '$locationProvider', '$urlRouterProvider' )
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
  @Run()
  @Inject('$rootScope')
  static runFactory($rootScope) {
    //$state.transitionTo('app.account')
    $rootScope.$on("$stateChangeError", console.log.bind(console));
  }
}

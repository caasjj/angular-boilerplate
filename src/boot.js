import angular from 'angular'
import 'angular-animate'
import 'angular-sanitize'
import 'angular-messages'
import 'angular-ui-router'
import 'angular-ui/bootstrap-bower/ui-bootstrap-tpls'
import 'angular-material'

import './app/modules/modules'

import './app/components/components'
import './app/core/core'
import './app/directives/directives'
import './app/routes/routes'


import {app} from './app/app'

angular.element(document).ready( () => {
  angular.bootstrap(document, [app.name], {
    strictDi: true
  })
})



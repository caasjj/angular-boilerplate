/**
 * @author    Martin Micunda {@link http://martinmicunda.com}
 * @copyright Copyright (c) 2015, Martin Micunda
 * @license   GPL-3.0
 */
'use strict';

import angular from 'angular';
import Decorate from './decorators'

let app = angular.module( 'app', [
    // angular modules
    'ngAnimate',
    'ngMessages',
    'ngSanitize',
    'ngMaterial',

    // 3rd party modules
    'ui.router',
    'ui.bootstrap',

    // my modules
    'wh.auth'

  ] )

let Decorators = Decorate( app )

export {app}

export default Decorators

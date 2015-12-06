'use strict';

// Decorate(angular.module('appName', []) will create the belows decorators for the
// module 'appName'
//export function decore(app) {
//
//  let appDecorators = {
//    Inject: Decorators.Inject,
//    Component: Decorators.Component
//  }
//
//  let decoratorList = ['Run', 'Config', 'Service', 'Filter', 'View', 'Directive', 'RouteConfig']
//  decoratorList.forEach( decorator => {
//    appDecorators[decorator] = Decorators[decorator].bind( null, app )
//  } )
//
//  console.log( 'App Decorators: ', appDecorators )
//  return appDecorators
//}


export default function Decorate(app) {

  let r = new RegExp( /function.*\((.*)\)/ ),
    appDecorators = {}

  Object.keys( Decorators ).forEach( decorator => {

    let params = ('' + Decorators[decorator]).match( r )[1].split( ',' )
    if (params[0] === 'app') {
      appDecorators[decorator] = Decorators[decorator].bind( null, app )
    }
    else {
      appDecorators[decorator] = Decorators[decorator]
    }

  } )

  return appDecorators
}
/***
 *
 * @type {{Run: (function(*)), Config: (function(*)), Service: (function(*, *)), Filter: (function(*, *)), Inject: (function(...[*])), Component: (function(*)), View: (function(*=, *)), Directive: (function(*, *)), RouteConfig: (function(*, *=, *=))}}
 */
let Decorators = {
  Run(app)
  {
    return function decorator(target, key, descriptor) {
      app.run( descriptor.value );
    };
  },

  Config(app) {
    return function decorator(target, key, descriptor) {
      app.config( descriptor.value );
    };
  },

  Service(app, options) {
    return function decorator(target) {
      options = options ? options : {};
      if (!options.serviceName) {
        throw new Error( '@Service() must contains serviceName property!' );
      }
      app.service( options.serviceName, target );
    };
  },

  Filter(app, filter) {
    return function decorator(target, key, descriptor) {
      filter = filter ? filter : {};
      if (!filter.filterName) {
        throw new Error( '@Filter() must contains filterName property!' );
      }
      app.filter( filter.filterName, descriptor.value );
    };
  },

  Inject(...dependencies) {
    return function decorator(target, key, descriptor) {
      // if it's true then we injecting dependencies into function and not Class constructor
      if (descriptor) {
        const fn = descriptor.value;
        fn.$inject = dependencies;
      } else {
        target.$inject = dependencies;
      }
    };
  },

  Component(component) {
    return function decorator(target) {
      component = component ? component : {};
      if (!component.selector) {
        throw new Error( '@Component() must contains selector property!' );
      }

      if (target.$initView) {
        target.$initView( component.selector );
      }

      target.$isComponent = true;
    };
  },

  View(app, view) {
    let options = view ? view : {};
    const defaults = {
      template: options.template,
      restrict: 'E',
      scope: {},
      bindToController: true,
      controllerAs: 'vm'
    };
    return function decorator(target) {
      if (target.$isComponent) {
        throw new Error( '@View() must be placed after @Component()!' );
      }

      target.$initView = function (directiveName) {
        directiveName = pascalCaseToCamelCase( directiveName );
        directiveName = dashCaseToCamelCase( directiveName );

        // this totally overrides the default 'bindToController: true' from above ?!
        options.bindToController = options.bindToController || options.bind || {};

        app.directive( directiveName, function () {
          return Object.assign( defaults, {controller: target}, options );
        } );
      };

      target.$isView = true;
      app.controller( target.name, target )
    };
  },

  Directive(app, options) {
    return function decorator(target) {
      const directiveName = dashCaseToCamelCase( options.selector );
      app.directive( directiveName, target.directiveFactory );
    };
  },

  RouteConfig(app, stateName, options) {
    return function decorator(target) {
      app.config( ['$stateProvider', ($stateProvider) => {
        $stateProvider.state( stateName, Object.assign( {
          controller: target,
          controllerAs: 'vm'
        }, options ) );
      }] );
      app.controller( target.name, target );
    };
  }
}


// Utils functions
function pascalCaseToCamelCase(str) {
  return str.charAt( 0 ).toLowerCase() + str.substring( 1 );
}

function dashCaseToCamelCase(string) {
  return string.replace( /-([a-z])/ig, function (all, letter) {
    return letter.toUpperCase();
  } );
}

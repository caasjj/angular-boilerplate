/**
 * Created by caasjj on 11/9/15.
 */
'use strict'
import 'angular-mocks'
import './login-button'

describe( 'LoginButtonValidator', () => {

  let $compile, $rootScope, scope, render

  beforeEach( () => {

    // 'module' is used by ES6 module loader
    angular.mock.module(
      'app',
      $exceptionHandlerProvider => {
        $exceptionHandlerProvider.mode( 'log' )
      }
    )

    //angular.mock.inject( (_$compile_, _$rootScope_) => {
    inject( (_$compile_, _$rootScope_) => {

      $compile = _$compile_
      $rootScope = _$rootScope_
      scope = $rootScope.$new()

      render = (component) => {
        let element = angular.element( component )
        let compiledElement = $compile( element )( scope )
        $rootScope.$digest()
        return compiledElement

      }

    } )

  } )

  describe( 'LoginButton controller', () => {

    it( 'should exist ', () => {

      let element = render( `<login-button></login-button>` )

      let controller = element.controller( 'loginButton' )

      expect( element.controller( 'loginButton' ) ).toBeDefined()

      expect( controller.toggle ).toBeDefined()
      expect( controller.login ).toBeDefined()
      expect( controller.logout ).toBeDefined()
      expect( controller.detectEnter ).toBeDefined()

    } )

    it( 'should control the component', () => {

      let element = render( `<login-button></login-button>` )
      let elementScope = element.isolateScope().vm
      let controller = element.controller( 'loginButton' )

      expect( elementScope._isOpen ).toEqual( false )
      controller.toggle()
      expect( elementScope._isOpen ).toEqual( true )

    } )

  } )


  describe( 'LoginButton scope', () => {
    it( 'should have scope bindings ', () => {
      let element = render( `<login-button button-direction="left" current-user="currentUser" bad-login="badLogin"></login-button>` )

      let elementScope = element.isolateScope().vm

      scope.buttonDirection = 'left'
      scope.currentUser = 'Bob'
      scope.badLogin = false
      scope.$apply()

      expect( elementScope.buttonDirection ).toEqual( scope.buttonDirection )
      expect( elementScope.currentUser ).toEqual( scope.currentUser )
      expect( elementScope.badLogin ).toEqual( scope.badLogin )

      let controller = element.controller( 'loginButton' )

    } )
  } )

  describe( 'Logging and exception handling ', () => {

    describe( 'should capture log messages and exceptions', function () {

      it( 'should have a value injected ', angular.mock.inject( ($log, $timeout, $exceptionHandler) => {

          $timeout( () => $log.log( 1 ) )
          $timeout( () => {
            $log.log( 2 )
            throw new Error( 'Bad Stuff' )
          } )
          $timeout( () => $log.log( 3 ) )

          $timeout.flush()

          expect( $exceptionHandler.errors[0].constructor.name ).toEqual( 'Error' )
          expect( $exceptionHandler.errors[0].message ).toEqual( 'Bad Stuff' )
          expect( $log.log.logs ).toEqual( [[1], [2], [3]] )

        } )
      )

    } )

  } )

  describe( 'Controller test with $controller', () => {

    it( 'should run the controller', () => {
      inject( $controller => {

        var dController = $controller( 'loginButtonController', {}, {buttonDirection: 'right'} )

        expect( dController.buttonDirection ).toEqual( 'right' )

      } )

    } )
  } )

  describe( 'LoginButton DOM handling ', () => {

    it( 'should show correction direction of chevron arrow ', () => {

      scope.buttonDirection = 'right'
      scope.$apply()

      let element = render( `<login-button button-direction="{{buttonDirection}}"></login-button>` )
      let elementScope = element.isolateScope().vm

      let chevron = {
        left: angular.element( element[0].querySelector( `.fa-chevron-circle-left` ) ),
        right: angular.element( element[0].querySelector( `.fa-chevron-circle-right` ) )
      }

      expect( chevron.left.hasClass( 'ng-hide' ) ).toEqual( true )
      expect( chevron.right.hasClass( 'ng-hide' ) ).toEqual( false )

    } )

    it( 'should open and close with click of chevron ', () => {

      scope.buttonDirection = 'left'
      scope.$apply()

      let element = render( `<login-button button-direction="{{buttonDirection}}" current-user="currentUser"></login-button>` )
      let elementScope = element.isolateScope().vm

      let chevron = angular.element( element[0].querySelector( `.fa-chevron-circle-left` ) )
      let inputs = angular.element( element[0].querySelector( 'fieldset' ) )
      let logoutButton = angular.element( element[0].querySelector( 'button.logout' ) )

      // Should start closed
      expect( elementScope._isOpen ).toEqual( false )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( true )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( true )

      // Open the login button
      chevron.triggerHandler( 'click' )
      expect( elementScope._isOpen ).toEqual( true )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( false )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( true )

      // Close it back up
      chevron.triggerHandler( 'click' )
      expect( elementScope._isOpen ).toEqual( false )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( true )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( true )

    } )

    it( 'should present logout button and remove inputs on login ', () => {

      scope.buttonDirection = 'left'
      scope.currentUser = 'Bob'
      scope.$apply()

      let element = render( `<login-button button-direction="{{buttonDirection}}" current-user="currentUser"></login-button>` )
      let elementScope = element.isolateScope().vm

      let chevron = angular.element( element[0].querySelector( `.fa-chevron-circle-left` ) )
      let inputs = angular.element( element[0].querySelector( 'fieldset' ) )
      let logoutButton = angular.element( element[0].querySelector( 'button.logout' ) )

      // Should start closed
      expect( elementScope._isOpen ).toEqual( false )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( true )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( true )

      // Open the login button
      chevron.triggerHandler( 'click' )
      expect( elementScope._isOpen ).toEqual( true )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( true )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( false )

      // Close it back up
      chevron.triggerHandler( 'click' )
      expect( elementScope._isOpen ).toEqual( false )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( true )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( true )

    } )

    it( 'should  remove logout button and present inputs on logout ', () => {

      scope.buttonDirection = 'left'
      scope.currentUser = 'Bob'
      scope.$apply()

      let element = render( `<login-button button-direction="{{buttonDirection}}" current-user="currentUser"></login-button>` )
      let elementScope = element.isolateScope().vm

      let chevron = angular.element( element[0].querySelector( `.fa-chevron-circle-left` ) )
      let inputs = angular.element( element[0].querySelector( 'fieldset' ) )
      let logoutButton = angular.element( element[0].querySelector( 'button.logout' ) )

      // Should start closed
      expect( elementScope._isOpen ).toEqual( false )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( true )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( true )

      // Open the login button
      chevron.triggerHandler( 'click' )
      expect( elementScope._isOpen ).toEqual( true )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( true )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( false )

      // Click the logout button
      logoutButton.triggerHandler( 'click' )

      // Button should be closed
      expect( elementScope._isOpen ).toEqual( false )

      // Open it back up
      chevron.triggerHandler( 'click' )
      expect( elementScope._isOpen ).toEqual( true )
      expect( inputs.hasClass( 'ng-hide' ) ).toEqual( false )
      expect( logoutButton.hasClass( 'ng-hide' ) ).toEqual( true )

    } )

  } )

} )


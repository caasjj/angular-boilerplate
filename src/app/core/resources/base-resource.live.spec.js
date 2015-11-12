/**
 * Created by caasjj on 11/11/15.
 */
'use strict'

import angular from  'angular'
import BaseResource from './base-resource'

describe( 'BaseResourceLiveVerifier', () => {

  //let $injector = angular.element( document ).injector(),
  let $injector = angular.injector( ['ng'] ),
    $http = $injector.get( '$http' ),
    userResource = new BaseResource( 'user', $http, 'http://localhost:1337' ),
    accountResource = new BaseResource( 'account', $http, 'http://localhost:1337' )


  let dummyUser = {
      email: 'JoeBlow@gmail.com',
      password: 'JBHasAnAwesomePassword'
    },
    dummyAccount = {
      type: "Facebook"
    }

  //let userResource, accountResource
  //angular.module('app')
  //beforeEach( $injector => {
  //  let $http = $injector().get( '$http' )
  //    userResource = new BaseResource( 'user', $http, 'http://localhost:1337' ),
  //    accountResource = new BaseResource( 'account', $http, 'http://localhost:1337' )
  //})

  describe( 'Creating a resource ', () => {

    it( 'should create a resource ', done => {

      let userId

      userResource
        .create( dummyUser )
        .then( user => {
          return user.data.id
        } )
        .then( id => {
          userId = id
          return userResource.findOne( id )
        } )
        .then( user => {
          expect( user.data.email ).toEqual( 'JoeBlow@gmail.com' )
        } )
        .then( () => {
          return userResource.delete( userId )
        } )
        .catch( err => {
          return userResource.delete( userId )
          done( err )
        } )
        .finally( () => {
          done()
        } )

    } )
  } )


  describe( 'Updating a resource ', () => {

    it( 'should create a resource ', done => {

      let userId,
        updatedEmail = 'JoeSchmoe@yahoo.com'

      userResource
        .create( dummyUser )
        .then( user => {
          return user.data.id
        } )
        .then( id => {
          userId = id
          return userResource.findOne( userId )
        } )
        .then( user => {
          return userResource.update( user.data.id, {
            email: updatedEmail
          } )
        } )
        .then( user => {
          expect( user.data.id ).toEqual( userId )
          expect( user.data.email ).toEqual( updatedEmail )
        } )
        .then( () => {
          return userResource.delete( userId )
        } )
        .catch( err => {
          return userResource.delete( userId )
          done( err )
        } )
        .finally( () => {
          done()
        } )

    } )
  } )

  describe( 'Creating an associated resource ', () => {

    let userId, accountId

    it( 'should create a new resource and associate it ', done => {

      userResource
        .create( dummyUser )
        .then( user => {
          userId = user.data.id
          expect( userId ).toBeGreaterThan( 0 )
          return userResource.createAndAssociate( userId, 'accounts', dummyAccount )
        } )
        .then( user => {
          expect( user.data.id ).toEqual( userId )
          expect( user.data.accounts ).toBeDefined()
          expect( user.data.accounts[0].type ).toEqual( dummyAccount.type )
          return user.data.accounts[0].id
        } )
        .then( id => {
          accountId = id
          return accountResource.findOne( id )
        } )
        .then( account => {
          expect( account.data.type ).toEqual( dummyAccount.type )
        } )
        .then( () => {
          return Promise.all( [
            userResource.delete( userId ),
            accountResource.delete( accountId )
          ] )
        } )
        .catch( err => {
          userResource.delete( userId )
          accountResource.delete( accountId )
          done( err )
        } )
        .finally( () => {
          done()
        } )
    } )
  } )

} )
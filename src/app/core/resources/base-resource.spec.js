import 'angular-mocks'

import BaseResource from './base-resource'


describe( 'BaseResourceVerifier', () => {

  //let resourceRegExp = (resourceName) => {
  //  return new RegExp(`\/api/${resourceName}\/[a-z]*`);
  //}
  //let idRegExp = (resourceName) => {
  //  return new RegExp( `\/api/${resourceName}\/(\\d+|[a-z]*)` )
  //}

  let baseResource, $httpBackend, $http,
    resourceName = 'widget',
    aWidget = {
      id: '0',
      data: 'test'
    },
    widgets = [
      {
        id: '0',
        data: 'test1'
      },
      {
        id: '1',
        data: 'test2'
      },
      {
        id: '2',
        data: 'test1'
      },
      {
        id: '3',
        data: 'test3'
      }
    ],
    newWidget = {
      data: 'testNew'
    }

  beforeEach( inject( (_$httpBackend_, _$http_) => {
      baseResource = new BaseResource( resourceName, _$http_ )
      $httpBackend = _$httpBackend_
      $http = _$http_
    } )
  )

  afterEach( function () {
    $httpBackend.verifyNoOutstandingRequest();
  } );

  describe( 'Construction ', () => {

    it( 'baseResource object should have the correct properties', () => {

      expect( baseResource.transport ).toEqual( $http )
      expect( baseResource.route ).toEqual( `/api/${resourceName}` )
      expect( baseResource.find ).toBeDefined()
      expect( baseResource.find.constructor.name ).toEqual( 'Function' )
      expect( baseResource.findOne ).toBeDefined()
      expect( baseResource.findOne.constructor.name ).toEqual( 'Function' )
      expect( baseResource.create ).toBeDefined()
      expect( baseResource.create.constructor.name ).toEqual( 'Function' )
      expect( baseResource.update ).toBeDefined()
      expect( baseResource.update.constructor.name ).toEqual( 'Function' )
      expect( baseResource.delete ).toBeDefined()
      expect( baseResource.delete.constructor.name ).toEqual( 'Function' )

    } )

  } )

  describe( 'Fetching resources using GET method', () => {

    it( 'using .findOne(id) should get an item based on its id', () => {

      $httpBackend.when( 'GET', `/api/${resourceName}/0` )
                  .respond( (method, url) => {
                    //console.log( `${method}, ${url}` )
                    return ( [200, widgets[0]])
                  } )

      baseResource
        .findOne( 0 )
        .then( response => {
          expect( response.status ).toEqual( 200 )
          expect( response.data ).toEqual( widgets[0] )
        } )

      $httpBackend.flush()
    } )

    it( 'using .find() should get a collection', () => {

      $httpBackend.when( 'GET', `/api/${resourceName}` )
                  .respond( (method, url) => {
                    //console.log( `${method}, ${url}` )
                    return [200, widgets]
                  } )

      baseResource
        .find()
        .then( response => {
          expect( response.status ).toEqual( 200 )
          expect( response.data ).toEqual( widgets )
        } )


      $httpBackend.flush()
    } )

    it( 'using .find(query) should get the items queried', () => {

      $httpBackend.when( 'GET', `/api/${resourceName}` )
                  .respond( (method, url, data) => {
                    //console.log( `${method}, ${url}, ${data}` )
                    let matches = widgets.filter( widget => {
                      return widget.data === data
                    } )
                    return [200, matches]
                  } )

      baseResource
        .find( {
          data: 'test1'
        } )
        .then( response => {
          expect( response.status ).toEqual( 200 )
          expect( response.data.length ).toEqual( 2 )
          expect( response.data[0] ).toEqual( {
            id: '0',
            data: 'test1'
          } )
          expect( response.data[1] ).toEqual( {
            id: '2',
            data: 'test1'
          } )
        } )


      $httpBackend.flush()
    } )

  } )

  describe( 'Creating resources', () => {

    it( 'using .create(params) should create a resource', () => {

      $httpBackend.when( 'POST', `/api/${resourceName}` )
                  .respond( (method, url, data) => {
                    data = JSON.parse( data )
                    //console.log( `${method}, ${url}, ${data}` )
                    let newItem = Object.assign( {id: '4'}, data )
                    widgets.push( newItem )
                    return [201, {id: newItem.id}]
                  } )

      $httpBackend.when( 'DELETE', `/api/${resourceName}/4` )
                  .respond( (method, url) => {
                    //console.log( `${method}, ${url}` )

                    if (widgets.length === 5) {
                      let returnWidget = widgets.pop()
                      if (returnWidget.id === '4' && returnWidget.data == 'newData') {
                        return ( [200, widgets.pop()] )
                      } else {
                        return ( [404, 'Wrong widget fetched at id 4'])
                      }
                    } else {
                      return [404, 'No widget with id 4']
                    }
                  } )

      baseResource
      // create the resource
        .create( newWidget )

        // get the response id
        .then( response => {
          expect( response.status ).toEqual(201)
          return response.data.id
        } )

        // delete it back, from its id
        .then( id => {
          return Promise.all( [baseResource.delete( id ), id] )
        } )

        // make sure you created and deleted the right object in the store
        .then( (response, id) => {
          expect( response.status ).toEqual( 200 )
          expect( response.data ).toEqual( Object.assign( {id: id}, newData ) )

        } )

      $httpBackend.flush()

    } )

    describe( 'Updating a resource', () => {

      it( 'using .update(id,params) should update the resource', () => {

        $httpBackend.when( 'PUT', `/api/${resourceName}/2` )
                    .respond( (method, url, data) => {
                      //console.log( `${method}, ${url}` )
                      widgets[2].data = JSON.parse( data).data
                      return [200, widgets[2]]
                    } )

        $httpBackend.when( 'GET', `/api/${resourceName}/2` )
                    .respond( (method, url) => {
                      //console.log( `${method}, ${url}` )
                      return ( [200, widgets[2]])
                    } )

        baseResource

        .update(2, {
          data: "SomethingNew!"
        })

        .then( response => {
          expect( response.status ).toEqual( 200 )
          return response.data.id
        })

        .then( id => {
          return Promise.all([baseResource.findOne(id), id])
        })

        .then( (response, id) => {
          expect( response.status ).toEqual( 200 )
          expect( response.data ).toEqual( Object.assign({id:id, data:'SomethingNew!'}) )
        })

        $httpBackend.flush()
      } )

    } )
  } )


} )
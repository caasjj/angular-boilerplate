/**
 * Created by caasjj on 11/8/15.
 */
'use strict'

import {Inject} from '../../app'

class BaseResourceMock {

  init(name, mockTransport, item, collection) {

    mockTransport.when( 'GET', `${host}/api/${name}` )
                 .respond( (method, url, data) => {
                    return [200, collection]
                 } )


  }
}
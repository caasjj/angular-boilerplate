/**
 * Created by caasjj on 11/8/15.
 */
'use strict'
import BaseResource from '../base-resource'
import {Service, Inject} from '../../../app'

@Service({
  serviceName: 'UserResource'
})

@Inject('$http')

class UserResource extends BaseResource {

  constructor($http) {
    super('user', $http)
  }

}

export default BaseResource
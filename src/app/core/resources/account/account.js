/**
 * Created by caasjj on 11/12/15.
 */
'use strict'
import BaseResource from '../base-resource'
import decorators from '../../../app'

@decorators.Service({
  serviceName: 'AccountResource'
})

@decorators.Inject('$http')

class AccountResource extends BaseResource {

  constructor($http) {
    super('account', $http)
  }
}

export default AccountResource
import decorators from '../../../app'

import template from './account-detail.template.html!text'

@decorators.RouteConfig('app.account.account-detail', {
  url: '/account-detail',
  template: template
})
class AccountDetail{
  constructor() {
    this.somedata = 'Account Detail connected to View'
  }
}

export default AccountDetail
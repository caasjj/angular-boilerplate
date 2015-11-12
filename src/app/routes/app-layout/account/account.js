
import {RouteConfig} from '../../../app'
import template from './account.template.html!text'
@RouteConfig('app.account', {
  template: template,
  url: '/account'
})
class Account {
  constructor() {
    this.somedata = 'Account connected to view'
  }
}
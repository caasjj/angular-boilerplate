/**
 * Created by caasjj on 11/3/15.
 */
'use strict'
import {Component, View, Inject} from '../../app'
import template from './footer.template.html!text'
@Component({
  selector: 'footer'
})

@View({
  template: template
})

class Footer {
  constructor () {
    this.somedata = 'Footer Component connected to View'
  }
}
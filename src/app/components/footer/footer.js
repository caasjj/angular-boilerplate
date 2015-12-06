/**
 * Created by caasjj on 11/3/15.
 */
'use strict'
import decorators from '../../app'
import template from './footer.template.html!text'
@decorators.Component({
  selector: 'footer'
})

@decorators.View({
  template: template
})

class Footer {
  constructor () {
    this.somedata = 'Footer Component connected to View'
  }
}
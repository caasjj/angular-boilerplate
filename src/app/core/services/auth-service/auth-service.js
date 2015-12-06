import decorators from '../../../app'
//import Promise from 'bluebird'

@decorators.Service( {
  serviceName: 'AuthService'
} )
@decorators.Inject('$q', '$http', 'UserResource')
class AuthService {

  constructor($q, $http, UserResource) {
    this.$q = $q
    this.$http = $http
    this.UserResource = UserResource
  }

  login(credentials) {

    if (credentials.strategy.toLowerCase() === 'local' && credentials.username === 'Bob' && credentials.password === 'ok') {

      this.currentUser = {
        id: 1,
        username : credentials.username,
        token: 1234
      }

      return this.$q.resolve( this.currentUser )

    } else {

      return this.$q.reject( new Error( 'Bad Credentials' ) )

    }
  }

  logout() {

    this.currentUser = null

  }

  getCurrentUser() {

    return  this.currentUser

  }

  authorize() {
  }

  register(credentials) {
   this.UserResource.create(credentials)
    .then( user => {
      console.log( 'User created: ', user)
    })
  }

}

export default AuthService

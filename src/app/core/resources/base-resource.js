
class BaseResource {

  constructor(name, transport, host) {
    this.transport = transport
    host = host || ''
    this.route = `${host}/api/${name}`
  }

  find(query) {
    return this.transport.get( this.route, query )
  }

  findOne(id) {
    return this.transport.get( `${this.route}/${id}` )
  }

  create(params) {
    return this.transport.post( this.route, params )
  }

  update(id, params) {
    return this.transport.put( `${this.route}/${id}`, params )
  }

  delete(id) {
    return this.transport.delete( `${this.route}/${id}` )
  }

  associate(id, associationName, associationId) {
    return this.transport.post( `${this.route}/${id}/${associationName}/${associationId}` )
  }

  createAndAssociate(id, associationName, associationParams) {
    return this.transport.post( `${this.route}/${id}/${associationName}`, associationParams)
  }

  dissociate(id, associationName, associationId) {
    return this.transport.delete( `${this.route}/${id}/${associationName}/${associationId}` )
  }

  populate(id, associationName) {
    return this.transport.get( `${this.route}/${id}/${associationName}`)
  }

}

export default BaseResource
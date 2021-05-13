const axios = require('axios')


function kebabCaseToCamel(str) {
  return str.replace(/(-\w)/g, (matches) => matches[1].toUpperCase())
}

class API {
  constructor({
    url
  }) {
    this.url = url
    this.endpoints = {}
  }

  createEntity(entity) {
    const name = kebabCaseToCamel(entity.name)
    this.endpoints[name] = this.createBasicCRUDEndpoints(entity)
  }

  createBasicCRUDEndpoints({
    name
  }) {
    var endpoints = {}

    const resourceURL = `${this.url}/${name}`

    endpoints.getAll = () => axios.get(resourceURL)

    endpoints.getOne = (id) => axios.get(resourceURL + "/" + id)

    endpoints.create = (toCreate, config = {}) => axios.post(resourceURL, toCreate, config)

    endpoints.update = (toUpdate, config = {}) => axios.put(`${resourceURL}/${toUpdate.id}`, toUpdate, config)

    endpoints.patch = ({
      id
    }, toPatch, config = {}) => axios.patch(`${resourceURL}/${id}`, toPatch, config)

    endpoints.delete = ({
      id
    }, config = {}) => axios.delete(`${resourceURL}/${id}`, config)

    return endpoints

  }
  createEntities(arrayOfEntity) {
    arrayOfEntity.forEach(this.createEntity.bind(this))
  }
}


const db = new API({
  url: 'http://localhost:3004'
})
// const apiURL = 'http://localhost:3004';
db.createEntity({
  name: 'Teachers'
})
db.createEntity({
  name: 'Students'
})
db.createEntity({
  name: 'Assignments'
})
db.createEntity({
  name: 'Completed'
})


//export db object
export {
  db
}
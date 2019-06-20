const faker = require('faker')

let productId = 1
class FakeProdcut {
  constructor () {
    this.id = productId++
    let fc = faker.commerce
    this.name = fc.productName()
    this.color = fc.color()
    this.department = fc.department()
    this.price = fc.price()
    this.adjective = fc.productAdjective()
    this.material = fc.productMaterial()
    this.product = fc.product()
  }

  serialize () {
    return {
      id: this.id,
      name: this.name,
      color: this.color,
      department: this.department,
      price: this.price,
      adjective: this.adjective,
      material: this.material,
      product: this.product
    }
  }
}

module.exports = function () {
  var data = { products: [] }
  // Create 1000 Product
  data.products = generateFakeObject(FakeProdcut, 100)
  return data
}

function generateFakeObject (TARGETCLASS = '', count = 10) {
  if (typeof TARGETCLASS !== 'function') {
    console.error('클래스가 아님')
    return []
  }
  let result = []
  for (var i = 0; i < count; i++) {
    const fp = new TARGETCLASS()
    result.push(fp.serialize())
  }
  return result
}

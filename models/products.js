const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')

// TODO Cвязать с бд specification
class Products {
  constructor({ nameGuitar, descriptionGuitar, priceGuitar, imgGuitar }) {
    this.nameGuitar = nameGuitar
    this.descriptionGuitar = descriptionGuitar
    this.priceGuitar = priceGuitar
    this.imgGuitar = imgGuitar
    this.uuid = uuidv4()
  }

  /**
   * Подготовка данных
   * @returns
   */
  toJSON() {
    return {
      nameGuitar: this.nameGuitar,
      descriptionGuitar: this.descriptionGuitar,
      priceGuitar: this.priceGuitar,
      imgGuitar: this.imgGuitar,
      id: this.uuid,
    }
  }

  printInfo() {
    console.log(this.nameGuitar, this.descriptionGuitar, this.priceGuitar, this.imgGuitar, 'printInfo')
  }

  /**
   * Сохранение данных в модель
   */
  async save() {
    const products = await Products.getAll()

    products.push(this.toJSON())
    console.log(products)

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'poducts.json'), JSON.stringify(products), (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  /**
   * Получение данных
   * @returns
   */
  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'poducts.json'), 'utf-8', (err, content) => {
        if (err) {
          reject.err
        } else {
          resolve(JSON.parse(content))
        }
      })
    })
  }
}

module.exports = Products

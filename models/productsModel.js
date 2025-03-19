const { v4: uuidv4 } = require('uuid')
const path = require('path')
const fs = require('fs')

// TODO Cвязать с бд specification
class Products {
  constructor({ manufactered, modelProduct, descriptionProduct, priceProduct, imgProduct }) {
    this.manufactered = manufactered
    this.modelProduct = modelProduct
    this.descriptionProduct = descriptionProduct
    this.priceProduct = priceProduct
    this.imgProduct = imgProduct
    this.uuid = uuidv4()
  }

  /**
   * Подготовка данных
   * @returns
   */
  toJSON() {
    return {
      manufactered: this.manufactered,
      modelProduct: this.modelProduct,
      descriptionProduct: this.descriptionProduct,
      priceProduct: this.priceProduct,
      imgProduct: this.imgProduct,
      id: this.uuid,
    }
  }

  printInfo() {
    console.log(this.manufactered, this.modelProduct, this.descriptionProduct, this.priceProduct, this.imgProduct, this.uuid, 'printInfo')
  }

  /**
   * Сохранение данных в модель
   */
  async save() {
    const products = await Products.getAll()

    products.push(this.toJSON())

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products), (err) => {
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
      fs.readFile(path.join(__dirname, '..', 'data', 'products.json'), 'utf-8', (err, content) => {
        if (err) {
          reject.err
        } else {
          if (!content) {
            content = []
            resolve(content)
          } else {
            resolve(JSON.parse(content))
          }
        }
      })
    })
  }

  /**
   * Получение данных по id
   * @param {*} id
   */
  static async getById(id) {
    //Получаю данные курсов
    const products = await Products.getAll()
    return products.find((product) => product.id === id)
  }

  static async update(product) {
    const products = await Products.getAll()
    const idx = products.findIndex((data) => data.id === product.id)
    products[idx] = product
    console.log(products, '!!!!!')

    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'products.json'), JSON.stringify(products), (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }
}

module.exports = Products

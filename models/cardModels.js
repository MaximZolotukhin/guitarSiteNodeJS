const fs = require('fs')
const path = require('path')

class Card {
  static async add(product) {
    const card = await Card.fetchCartProducts()

    const idx = card.products.findIndex((data) => data.id === product.id)
    const candidate = card.products[idx]

    if (candidate) {
      //Товар есть
      candidate.count++
      card.products[idx] = candidate
    } else {
      //Товара нет
      product.count = 1
      card.products.push(product)
    }

    card.price += +product.price

    //сохранение данных в корзину
    return new Promise((resolve, reject) => {
      fs.writeFile(path.join(__dirname, '..', 'data', 'card.json'), JSON.stringify(card), (err) => {
        if (err) {
          reject(err)
        } else {
          resolve(card)
        }
      })
    })
  }

  static async fetchCartProducts() {
    return new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, '..', 'data', 'card.json'), 'utf8', (err, content) => {
        if (err) {
          reject(err)
        } else {
          resolve(JSON.parse(content))
        }
      })
    })
  }
}

module.exports = Card

const toCorrency = (price) => {
  return new new Intl.NumberFormat('ru-Ru', {
    currency: 'rub',
    style: 'currency',
  }).format(node.textContent)
}

//Обработка цены
document.querySelectorAll('.price>span').forEach((node) => {
  node.textContent = toCorrency(node.textContent)
})

// Обработка кнопки удаление товара
const $card = document.querySelector('#card')

if ($card) {
  $card.addEventListener('click', (event) => {
    //Ограничиваем область срабатывания только на кнопке
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id

      fetch('/card/remove/' + id, {
        method: 'delete',
      })
        .then((res) => res.json())
        .then((card) => {
          //Динамическое изменение данных в корзине
          if (card.products.length) {
            const html = card.products
              .map((data) => {
                return `
                <tr>
                  <td>${data.manufactered}</td>
                  <td>${data.modelProduct}</td>
                  <td>${data.count}</td>
                  <td>${data.priceProduct}</td>
                  <td><button class='bth btn-small js-remove' data-id='${data.id}'>Удалить</button></td>
                </tr>
              `
              })
              .join('')

            $card.querySelector('tbody').innerHTML = html
            $card.querySelector('price>span').innerHTML = toCorrency(card.price)
          } else {
            $card.innerHTML = '<p>Корзина пуста</p>'
          }
        })
    }
  })
}

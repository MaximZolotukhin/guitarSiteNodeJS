// Форматирование цены
const toCurrency = (price) => {
  return new Intl.NumberFormat('ru-Ru', {
    currency: 'rub',
    style: 'currency',
  }).format(price)
}
document.querySelectorAll('.price > span').forEach((node) => {
  node.textContent = toCurrency(node.textContent)
})

// Обработка кнопки удаление товара
const $cart = document.querySelector('#cart')

if ($cart) {
  $cart.addEventListener('click', (event) => {
    //Ограничиваем область срабатывания только на кнопке
    if (event.target.classList.contains('js-remove')) {
      const id = event.target.dataset.id
      const csrf = event.target.dataset.csrf

      fetch('/cart/remove/' + id, {
        method: 'delete',
        headers: { 'X-XSRF-TOKEN': csrf },
      })
        .then((res) => res.json())
        .then((cart) => {
          //Динамическое изменение данных в корзине
          if (cart.products.length) {
            const html = cart.products
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

            $cart.querySelector('tbody').innerHTML = html
            $cart.querySelector('price>span').innerHTML = toCorrency(cart.price)
          } else {
            $cart.innerHTML = '<p>Корзина пуста</p>'
          }
        })
    }
  })
}

const toDate = (date) => {
  return new Intl.DateTimeFormat('ru-Ru', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  }).format(new Date(date))
}

document.querySelectorAll('.date').forEach((node) => (node.textContent = toDate(node.textContent)))

const tabsLogin = document.querySelectorAll('.tabs')
M.Tabs.init(tabsLogin)

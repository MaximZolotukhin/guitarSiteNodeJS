//Обработка цены
document.querySelectorAll('.price').forEach((node) => {
  node.textContent = new Intl.NumberFormat('ru-Ru', {
    currency: 'rub',
    style: 'currency',
  }).format(node.textContent)
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
          console.log(card)
        })
    }
  })
}

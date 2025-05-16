




fetch('category.json')
   .then(res => res.json())
   .then(data => {
      console.log(data);

      document.querySelector('[data-body]').innerHTML = ''; // очищаем контейнер

      // вставка в DOM
      data.forEach((elem) => {
         document.querySelector('[data-tab-menu]').insertAdjacentHTML('beforeend', `
                   <button data-tab-button>${elem.name}</button>
               `);
      });
   })
   .catch(err => console.error('ошибка:', err));







function main() {
   const category = document.querySelector('[data-body]').getAttribute('data-body') // текущая категория

   fetch(`json/${category}.json`)
      .then(res => res.json())
      .then(data => {
         console.log(data)

         const filteredData = data.filter(elem => elem.category === category)
         filteredData.sort((a, b) => parseFloat(a.price.open) - parseFloat(b.price.open))

         const container = document.querySelector('[data-body]')
         container.innerHTML = ''

         filteredData.forEach((elem) => {
            if (elem.name && elem.move && elem.price) {
               container.insertAdjacentHTML('afterbegin', `
                  <div data-point data-name="${elem.name}">
                     <div data-img><img src="img/${category}/${elem.name}.jpg" alt="${elem.name}"></div>
                     <div data-info>
                        <div data-move>${elem.move}</div>
                        <div data-text>${elem.price.open}-${elem.price.close}</div>
                     </div>
                  </div>
               `)
            }
         })

         document.querySelector('[data-burger-point="amount"]').innerHTML = `к-во json файлов: ${data.length}`

         document.querySelectorAll('[data-img] img').forEach(img => {
            img.onerror = () => alert(`нету img ${img.src}`)
         })
      })
      .catch(err => console.error('ошибка:', err))
}





document.addEventListener('click', (event) => {
   const targ = event.target

   if (targ.closest('[data-tab-button]')) {
      document.querySelector('[data-body]').innerHTML = ''; // очищаем контейнер

      document.querySelector('[data-tab-menu]').classList.remove('_active')
      document.querySelector('body').classList.add('_active')
      document.querySelector('[data-back]').classList.add('_active')

      const text = targ.closest('[data-tab-button]').innerText

      document.querySelector('[data-body]').setAttribute('data-body', text)

      main()

   }

   if (targ.closest('[data-settings]')) {
      const burger = document.querySelector('[data-burger]')
      const shadow = document.querySelector('[data-shadow]')

      if (burger.classList.contains('_active')) {
         burger.classList.remove('_active')
         shadow.classList.remove('_active')

      } else {
         burger.classList.add('_active')
         shadow.classList.add('_active')

      }

   }

   if (targ.closest('[data-sort]')) {
      document.querySelector('[data-body]').innerHTML = ''

      targ.closest('[data-sort]').classList.add('_active')

      const dataSortAll = document.querySelectorAll('[data-sort]')
      dataSortAll.forEach((dataSort) => {
         if (dataSort !== targ.closest('[data-sort]')) {
            dataSort.classList.remove('_active')
         }
      })
   }


   if (targ.closest('[data-sort="price-open"]')) {

      const shadow = document.querySelector('[data-shadow]')
      shadow.classList.remove('_active')

      document.querySelector('[data-burger]').classList.remove('_active')

      const category = document.querySelector('[data-body]').getAttribute('data-body')

      const maxPrice = parseFloat(prompt('введи макс цену'))

      if (isNaN(maxPrice)) return alert('не число')

      fetch(`json/${category}.json`)
         .then(res => res.json())
         .then(data => {
            const filteredData = data.filter(elem =>
               elem.category === category && parseFloat(elem.price.open) <= maxPrice
            )

            filteredData.sort((a, b) => parseFloat(a.price.open) - parseFloat(b.price.open))

            filteredData.forEach(elem => {
               if (elem.name && elem.price) {
                  document.querySelector('[data-body]').insertAdjacentHTML('afterbegin', `
                  <div data-point data-name="${elem.name}">
                     <div data-img><img src="img/${category}/${elem.name}.jpg" alt="${elem.name}"></div>
                     <div data-info>
                        <div data-move>${elem.move}</div>
                        <div data-text>${elem.price.open}-${elem.price.close}</div>
                     </div>
                  </div>
               `)
               }
            })
         })
         .catch(err => console.error('ошибка:', err))
   }
   if (targ.closest('[data-sort="price-close"]')) {

      const shadow = document.querySelector('[data-shadow]')
      shadow.classList.remove('_active')

      document.querySelector('[data-burger]').classList.remove('_active')

      const category = document.querySelector('[data-body]').getAttribute('data-body')

      const maxPrice = parseFloat(prompt('введи макс цену'))

      if (isNaN(maxPrice)) return alert('не число')

      fetch(`json/${category}.json`)
         .then(res => res.json())
         .then(data => {
            const filteredData = data.filter(elem =>
               elem.category === category && parseFloat(elem.price.close) <= maxPrice
            )

            filteredData.sort((a, b) => parseFloat(a.price.close) - parseFloat(b.price.close))

            filteredData.forEach(elem => {
               if (elem.name && elem.price) {
                  document.querySelector('[data-body]').insertAdjacentHTML('afterbegin', `
                  <div data-point data-name="${elem.name}">
                     <div data-img><img src="img/${category}/${elem.name}.jpg" alt="${elem.name}"></div>
                     <div data-info>
                        <div data-move>${elem.move}</div>
                        <div data-text>${elem.price.close}-${elem.price.close}</div>
                     </div>
                  </div>
               `)
               }
            })
         })
         .catch(err => console.error('ошибка:', err))
   }

   if (targ.closest('[data-sort="long"]')) {


      const shadow = document.querySelector('[data-shadow]');
      shadow.classList.remove('_active');

      document.querySelector('[data-burger]').classList.remove('_active');

      const category = document.querySelector('[data-body]').getAttribute('data-body'); // Получаем категорию из атрибута

      document.querySelector('[data-body]').innerHTML = ''; // Очищаем содержимое перед вставкой

      fetch(`json/${category}.json`)
         .then(res => res.json())
         .then(data => {
            // Фильтруем только элементы с move: "🟩" и соответствующие категории
            const filteredData = data.filter(elem => elem.move === '🟩' && elem.category === category);

            // Сортируем по price.open (по возрастанию)
            filteredData.sort((a, b) => parseFloat(a.price.open) - parseFloat(b.price.open));

            // Вставляем отсортированные данные в DOM
            filteredData.forEach((elem) => {
               if (elem.name && elem.price) {
                  document.querySelector('[data-body]').insertAdjacentHTML('afterbegin', `
            <div data-point data-name="${elem.name}">
              <div data-img><img src="img/${category}/${elem.name}.jpg" alt="${elem.name}"></div>
              <div data-info>
                <div data-move>${elem.move}</div>
                <div data-text>${elem.price.open}-${elem.price.close}</div>
              </div>
            </div>
          `);
               }
            });
         })
         .catch(err => console.error('ошибка:', err));
   }
   if (targ.closest('[data-sort="short"]')) {


      const shadow = document.querySelector('[data-shadow]');
      shadow.classList.remove('_active');

      document.querySelector('[data-burger]').classList.remove('_active');

      const category = document.querySelector('[data-body]').getAttribute('data-body'); // Получаем категорию из атрибута

      document.querySelector('[data-body]').innerHTML = ''; // Очищаем содержимое перед вставкой

      fetch(`json/${category}.json`)
         .then(res => res.json())
         .then(data => {
            const filteredData = data.filter(elem => elem.move === '🟥' && elem.category === category)
            filteredData.sort((a, b) => parseFloat(a.price.open) - parseFloat(b.price.open))

            filteredData.forEach((elem) => {
               if (elem.name && elem.price) {
                  document.querySelector('[data-body]').insertAdjacentHTML('afterbegin', `
               <div data-point data-name="${elem.name}">
                  <div data-img><img src="img/${category}/${elem.name}.jpg" alt="${elem.name}"></div>
                  <div data-info>
                     <div data-move>${elem.move}</div>
                     <div data-text>${elem.price.open}-${elem.price.close}</div>
                  </div>
               </div>
            `)
               }
            })
         })
         .catch(err => console.error('ошибка:', err))

   }


   if (targ.closest('[data-sort="all"]')) {

      const shadow = document.querySelector('[data-shadow]')
      shadow.classList.remove('_active')

      document.querySelector('[data-burger]').classList.remove('_active')

      main()

   }



   if (targ.closest('[data-back]')) {
      document.querySelector('[data-back]').classList.remove('_active')
      document.querySelector('[data-tab-menu]').classList.add('_active')
   }




   if (targ.closest('[data-shadow]')) {
      const shadow = document.querySelector('[data-shadow]')
      const dropDown = document.querySelector('[data-dropdown]')
      const point = document.querySelector('[data-point]._active')
      const input = document.querySelector("input[tabindex='-1']")
      const inputSecond = document.querySelector('[data-input-second]')
      const inputThird = document.querySelector('[data-input-third]')
      const inputFourth = document.querySelector('[data-input-fourth]')


      shadow.classList.remove('_active')
      dropDown && dropDown.remove()

      point && point.classList.remove('_active')
      input && input.remove()
      inputSecond && inputSecond.remove()
      inputThird && inputThird.remove()
      inputFourth && inputFourth.remove()

      document.querySelector('[data-burger]').classList.remove('_active')

   }



})






// if (targ.closest('[data-point]')) {
//    const targPoint = targ.closest('[data-point]')
//    targPoint.classList.add('_active')
//    const targpoint = targPoint.querySelector('[data-text]')
//    const taskShadow = document.querySelector('[data-shadow]')

//    if (!document.querySelector('[data-dropdown]')) {
//       targtext.classList.add('_active')
//       taskShadow.classList.add('_active')

//       const rect = targPoint.getBoundingClientRect()

//       let main = `
//         <button data-move-up>выше</button>
//         <button data-move-down>ниже</button>
//       `

//       const div = document.createElement('div')
//       div.setAttribute('data-dropdown', '')
//       div.style.width = "105px"
//       div.style.position = 'absolute'
//       div.style.left = `${rect.left + window.scrollX}px`
//       div.style.visibility = 'hidden'
//       div.innerHTML = `
//          ${main}
//       `

//       document.body.appendChild(div)

//       const dropdownHeight = div.offsetHeight
//       const spaceBelow = window.innerHeight - rect.bottom
//       const spaceAbove = rect.top

//       if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
//          div.style.top = `${rect.top + window.scrollY - dropdownHeight}px`
//       } else {
//          div.style.top = `${rect.bottom + window.scrollY}px`
//       }

//       div.style.visibility = 'visible'
//    }


// }

// if (targ.closest('[data-shadow]')) {
//    const shadow = targ.closest('[data-shadow]')
//    const dropDown = document.querySelector('[data-dropdown]')
//    const point = document.querySelector('[data-point]._active')
//    const input = document.querySelector("input[tabindex='-1']")
//    const inputSecond = document.querySelector('[data-input-second]')
//    const inputThird = document.querySelector('[data-input-third]')
//    const inputFourth = document.querySelector('[data-input-fourth]')

//    shadow.classList.remove('_active')
//    dropDown && dropDown.remove()

//    point && point.classList.remove('_active')
//    input && input.remove()
//    inputSecond && inputSecond.remove()
//    inputThird && inputThird.remove()
//    inputFourth && inputFourth.remove()

//    document.querySelector('[data-burger]')?.classList.remove('_active')

// }

// if (targ.closest('[data-delete]')) {
//    const targElem = targ.closest('[data-delete]')
//    const targPoint = document.querySelector('[data-point]._active')

//    document.querySelector('[data-shadow]').classList.remove('_active')

//    targPoint.remove()

//    const dropDown = document.querySelector('[data-dropdown]')
//    dropDown && dropDown.remove()


// }


window.onerror = function (message, source, lineno, colno, error) {
   console.log('============= ERROR ============');
   console.error("ошибка:", message);
   console.error("стек:", error?.stack);
   console.log('============= ERROR ============');

};

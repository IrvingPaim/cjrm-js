const button = document.querySelector('button')
const popupWrapper = document.querySelector('.popup-wrapper')

button.addEventListener('click', () => {
    popupWrapper.style.display = 'block'
})

popupWrapper.addEventListener('click', event => {
    const classNameOfClickedElement = event.target.classList[0]
    const classNames = ['popup-close', 'popup-wrapper', 'popup-link']
    const shouldClosePopup = classNames.some(className => 
        className === classNameOfClickedElement)

    if (shouldClosePopup) {
        popupWrapper.style.display = 'none'
    }    
})


const engKeys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],
    ["caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]"],
    ["shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "enter"],
    ["done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/"],
    ["en", "sound", "space", "left", "right"]
]

let defaultKeys = engKeys

const shiftEngKeys = [
    ["!", "@", "#", "$", "%", "^", "\u0026", "*", "(", ")", "_", "+", "backspace"],
    ["caps", "q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "{", "}"],
    ["shift", "a", "s", "d", "f", "g", "h", "j", "k", "l", ":", '"', "enter"],
    ["done", "z", "x", "c", "v", "b", "n", "m", "<", ">", "?"],
    ["en", "sound", "space", "left", "right"]
]

let shiftDefaultKeys = shiftEngKeys

const rusKeys = [
    ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "=", "backspace"],
    ["caps", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
    ["shift", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", 'э', "enter"],
    ["done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", "."],
    ["ru", "sound", "space", "left", "right"]
]

const shiftRusKeys = [
    ["!", '"', "№", ";", "%", ":", "?", "*", "(", ")", "_", "+", "backspace"],
    ["caps", "й", "ц", "у", "к", "е", "н", "г", "ш", "щ", "з", "х", "ъ"],
    ["shift", "ф", "ы", "в", "а", "п", "р", "о", "л", "д", "ж", 'э', "enter"],
    ["done", "я", "ч", "с", "м", "и", "т", "ь", "б", "ю", ","],
    ["ru", "sound", "space", "left", "right"]
]

const properties = {
    value: "",
    capsLock: false,
    shift: false,
    cursorPos: 0,
    ru: false,
    sound: false
}

const render = (parent, child) => parent.appendChild(child)

const createElement = (state) => {
    const textAreaent = document.createElement(state.type)
    textAreaent.type = state.type || ''
    textAreaent.className = state.class || ''
    if (state.innerHTML !== undefined) textAreaent.innerHTML = state.innerHTML
    if (state.textContent !== undefined) textAreaent.textContent = state.textContent
    if (state.value !== undefined) textAreaent.value = state.value
    return textAreaent
}

const updateTextArea = () => {
    const textArea = document.querySelector('.use-keyboard-input')
    textArea.focus()
    textArea.value = properties.value
}

const setCaretPosition = (caretPos) => {
    const textArea = document.querySelector('.use-keyboard-input')
    if (textArea !== null || textArea !== undefined) {
        textArea.focus()
        textArea.setSelectionRange(caretPos, caretPos)
    }
}

const backspace = () => {
    if (properties.cursorPos === properties.value.length) {
        properties.value = properties.value.slice(0, -1)
        properties.cursorPos = properties.value.length
    } else {
        if (properties.cursorPos !== 0) {
            properties.value = properties.value.slice(0, properties.cursorPos - 1) + properties.value.slice(properties.cursorPos)
            properties.cursorPos = properties.cursorPos - 1
        }
    }
    updateTextArea()
    setCaretPosition(properties.cursorPos)
}

const caps = () => {
    keysContainerElement.innerHTML = ''
    if (!properties.capsLock) {
        properties.capsLock = true
        if (properties.shift) render(keysContainerElement, keys({ keys: shiftDefaultKeys }))
        else render(keysContainerElement, keys({ keys: defaultKeys }))
    } else {
        properties.capsLock = false
        if (properties.shift) render(keysContainerElement, keys({ keys: shiftDefaultKeys }))
        else render(keysContainerElement, keys({ keys: defaultKeys }))
    }
}

const shift = () => {
    keysContainerElement.innerHTML = ''
    if (!properties.shift) {
        properties.shift = true
        render(keysContainerElement, keys({ keys: shiftDefaultKeys }))
    } else {
        properties.shift = false
        render(keysContainerElement, keys({ keys: defaultKeys }))
    }
}

const sound = (key) => {
    if (!properties.sound) return
    let audio;
    if (key === 'CapsLock') audio = document.querySelector(`audio[data-key="caps-key"]`)
    else if (key === 'Shift') audio = document.querySelector(`audio[data-key="shift-key"]`)
    else if (key === ' ') audio = document.querySelector(`audio[data-key="space-key"]`)
    else if (key === 'Enter') audio = document.querySelector(`audio[data-key="enter-key"]`)
    else if (key === 'Backspace') audio = document.querySelector(`audio[data-key="backspace-key"]`)
    else {
        if (!properties.ru) audio = document.querySelector(`audio[data-key="eng-key"]`)
        else audio = document.querySelector(`audio[data-key="rus-key"]`)
    }
    audio.currentTime = 0
    audio.play()
}

let keyElements;

const keys = (state) => {
    const fragment = document.createDocumentFragment()

    const createIconHTML = (icon_name) => `<i class="material-icons">${icon_name}</i>`

    state.keys.forEach((line) => {
        line.forEach((key) => {
            switch (key) {
                case "backspace":
                    {
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide', innerHTML: createIconHTML('backspace') })
                        keyElement.addEventListener("click", () => {
                            sound('Backspace')
                            backspace()
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "caps":
                    {
                        const active = properties.capsLock ? ' keyboard__key--active' : ''
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide keyboard__key--activatable' + active, innerHTML: createIconHTML('keyboard_capslock') })
                        keyElement.addEventListener("click", () => {
                            sound('CapsLock')
                            caps()
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "shift":
                    {
                        const active = properties.shift ? ' keyboard__key--active' : ''
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide keyboard__key--activatable' + active, innerHTML: createIconHTML('keyboard_arrow_up') })
                        keyElement.addEventListener("click", () => {
                            sound('Shift')
                            shift()
                            keyElements = [...document.querySelectorAll('.keyboard__key')].reduce((res, el) => {
                                if (res[el] === undefined) {
                                    if (el.children.length === 1) res[el.children[0].innerHTML.toLowerCase()] = el
                                    else res[el.innerHTML.toLowerCase()] = el
                                }
                                return res
                            }, {})
                            keyElements['check_circle'].addEventListener('click', () => {
                                keyElements['check_circle'].classList.add('keyboard__key-active')
                                setTimeout(() => keyElements['check_circle'].classList.remove('keyboard__key-active'), 150)
                                keyboardElement.classList.add('keyboard--hidden')
                            })
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "enter":
                    {
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide', innerHTML: createIconHTML('keyboard_return') })
                        keyElement.addEventListener("click", () => {
                            sound('Enter')
                            properties.value += "\n"
                            properties.cursorPos += 1
                            updateTextArea()
                            setCaretPosition(properties.cursorPos)
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "en":
                    {
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key', innerHTML: key })
                        keyElement.addEventListener("click", () => {
                            sound('')
                            properties.ru = true
                            keysContainerElement.innerHTML = ''
                            defaultKeys = rusKeys
                            shiftDefaultKeys = shiftRusKeys
                            render(keysContainerElement, keys({ keys: defaultKeys }))
                            keyElements = [...document.querySelectorAll('.keyboard__key')].reduce((res, el) => {
                                if (res[el] === undefined) {
                                    if (el.children.length === 1) res[el.children[0].innerHTML.toLowerCase()] = el
                                    else res[el.innerHTML.toLowerCase()] = el
                                }
                                return res
                            }, {})
                            keyElements['check_circle'].addEventListener('click', () => {
                                keyElements['check_circle'].classList.add('keyboard__key-active')
                                setTimeout(() => keyElements['check_circle'].classList.remove('keyboard__key-active'), 150)
                                keyboardElement.classList.add('keyboard--hidden')
                            })
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "ru":
                    {
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key', innerHTML: key })
                        keyElement.addEventListener("click", () => {
                            sound('')
                            properties.ru = false
                            keysContainerElement.innerHTML = ''
                            defaultKeys = engKeys
                            shiftDefaultKeys = shiftEngKeys
                            render(keysContainerElement, keys({ keys: defaultKeys }))
                            keyElements = [...document.querySelectorAll('.keyboard__key')].reduce((res, el) => {
                                if (res[el] === undefined) {
                                    if (el.children.length === 1) res[el.children[0].innerHTML.toLowerCase()] = el
                                    else res[el.innerHTML.toLowerCase()] = el
                                }
                                return res
                            }, {})
                            keyElements['check_circle'].addEventListener('click', () => {
                                keyElements['check_circle'].classList.add('keyboard__key-active')
                                setTimeout(() => keyElements['check_circle'].classList.remove('keyboard__key-active'), 150)
                                keyboardElement.classList.add('keyboard--hidden')
                            })
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "space":
                    {
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide', innerHTML: createIconHTML('space_bar') })
                        keyElement.addEventListener("click", () => {
                            sound(' ')
                            properties.value = properties.value.slice(0, properties.cursorPos) + ' ' + properties.value.slice(properties.cursorPos)
                            updateTextArea()
                            properties.cursorPos += 1
                            setCaretPosition(properties.cursorPos)
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "left":
                    {
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide', innerHTML: createIconHTML('keyboard_arrow_left') })
                        keyElement.addEventListener("click", () => {
                            sound('')
                            if (properties.cursorPos !== 0) properties.cursorPos = properties.cursorPos - 1
                            setCaretPosition(properties.cursorPos)
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "right":
                    {
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide', innerHTML: createIconHTML('keyboard_arrow_right') })
                        keyElement.addEventListener("click", () => {
                            sound('')
                            if (properties.cursorPos !== properties.value.length) properties.cursorPos = properties.cursorPos + 1
                            setCaretPosition(properties.cursorPos)
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "sound":
                    {
                        const active = properties.sound ? ' keyboard__key--active' : ''
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide keyboard__key--activatable' + active, innerHTML: createIconHTML('audiotrack') })
                        keyElement.addEventListener("click", () => {
                            if (!properties.sound) {
                                keyElement.classList.add('keyboard__key--active')
                                properties.sound = true
                            } else {
                                keyElement.classList.remove('keyboard__key--active')
                                properties.sound = false
                            }
                        })
                        render(fragment, keyElement)
                        break;
                    }

                case "done":
                    {
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key keyboard__key--wide keyboard__key--dark', innerHTML: createIconHTML('check_circle') })
                        render(fragment, keyElement)
                        break;
                    }

                default:
                    {
                        let condition;
                        if (properties.capsLock && !properties.shift || properties.shift && !properties.capsLock) condition = true
                        else condition = false
                        const keyElement = createElement({ type: 'button', class: 'keyboard__key', textContent: condition ? key.toUpperCase() : key.toLowerCase() })
                        keyElement.addEventListener('click', () => {
                            sound('')
                            properties.value = properties.value.slice(0, properties.cursorPos) + keyElement.textContent + properties.value.slice(properties.cursorPos)
                            updateTextArea()
                            properties.cursorPos += 1
                            setCaretPosition(properties.cursorPos)
                        })
                        render(fragment, keyElement)
                        break;
                    }
            }
        })
        render(fragment, document.createElement("br"))
    })
    return fragment
}

const keyboardElement = createElement({ type: 'div', class: 'keyboard' })
keyboardElement.classList.add('keyboard--hidden')
const keysContainerElement = createElement({ type: 'div', class: 'keyboard__keys' })
const textArea = document.querySelector('.use-keyboard-input')

render(keyboardElement, keysContainerElement)
render(keysContainerElement, keys({ keys: engKeys }))
render(document.body, keyboardElement)

keyElements = [...document.querySelectorAll('.keyboard__key')].reduce((res, el) => {
    if (res[el] === undefined) {
        if (el.children.length === 1) res[el.children[0].innerHTML.toLowerCase()] = el
        else res[el.innerHTML.toLowerCase()] = el
    }
    return res
}, {})


keyElements['check_circle'].addEventListener('click', () => {
    keyElements['check_circle'].classList.add('keyboard__key-active')
    setTimeout(() => keyElements['check_circle'].classList.remove('keyboard__key-active'), 150)
    keyboardElement.classList.add('keyboard--hidden')
})


let blockout = false
let isShiftPress = false

document.body.addEventListener('keydown', (e) => {
    keyboardElement.classList.remove('keyboard--hidden')

    if (e.shiftKey && e.altKey) {
        blockout = true
        if (!properties.ru) {
            defaultKeys = rusKeys
            shiftDefaultKeys = shiftRusKeys
            properties.ru = true
        } else {
            defaultKeys = engKeys
            shiftDefaultKeys = shiftEngKeys
            properties.ru = false
        }
        keysContainerElement.innerHTML = ''
        render(keysContainerElement, keys({ keys: defaultKeys }))
        keyElements = [...document.querySelectorAll('.keyboard__key')].reduce((res, el) => {
            if (res[el] === undefined) {
                if (el.children.length === 1) res[el.children[0].innerHTML.toLowerCase()] = el
                else res[el.innerHTML.toLowerCase()] = el
            }
            return res
        }, {})
        setTimeout(() => blockout = false, 500)
        keyElements['check_circle'].addEventListener('click', () => {
            keyElements['check_circle'].classList.add('keyboard__key-active')
            setTimeout(() => keyElements['check_circle'].classList.remove('keyboard__key-active'), 150)
            keyboardElement.classList.add('keyboard--hidden')
        })
        return
    }


    if (e.key === 'Shift') {
        shift()
        keyElements = [...document.querySelectorAll('.keyboard__key')].reduce((res, el) => {
            if (res[el] === undefined) {
                if (el.children.length === 1) res[el.children[0].innerHTML.toLowerCase()] = el
                else res[el.innerHTML.toLowerCase()] = el
            }
            return res
        }, {})
        keyElements['keyboard_arrow_up'].classList.add('keyboard__key-active')
        setTimeout(() => keyElements['keyboard_arrow_up'].classList.remove('keyboard__key-active'), 150)
        keyElements['check_circle'].addEventListener('click', () => {
            keyElements['check_circle'].classList.add('keyboard__key-active')
            setTimeout(() => keyElements['check_circle'].classList.remove('keyboard__key-active'), 150)
            keyboardElement.classList.add('keyboard--hidden')
        })
        return
    }

    if (shiftDefaultKeys.some((element) => element.includes(e.key.toLowerCase()))) {
        if (e.key === '&' && keyElements['&amp;'] !== undefined) keyElements['&amp;'].classList.add('keyboard__key-active')
        else {
            if (keyElements[e.key.toLowerCase()] !== undefined) keyElements[e.key.toLowerCase()].classList.add('keyboard__key-active')
        }
        textArea.focus()
        properties.cursorPos = textArea.selectionStart
        properties.value = textArea.value
        setTimeout(() => {
            if (e.key === '&') keyElements['&amp;'].classList.remove('keyboard__key-active')
            else keyElements[e.key.toLowerCase()].classList.remove('keyboard__key-active')
        }, 150)
    }
})

document.body.addEventListener('keyup', (e) => {
    keyboardElement.classList.remove('keyboard--hidden')
    sound(e.key)
    if (blockout) return

    if (e.key === 'CapsLock') {
        caps()
        keyElements = [...document.querySelectorAll('.keyboard__key')].reduce((res, el) => {
            if (res[el] === undefined) {
                if (el.children.length === 1) res[el.children[0].innerHTML.toLowerCase()] = el
                else res[el.innerHTML.toLowerCase()] = el
            }
            return res
        }, {})
        keyElements['keyboard_capslock'].classList.add('keyboard__key-active')
        setTimeout(() => keyElements['keyboard_capslock'].classList.remove('keyboard__key-active'), 150)
        keyElements['check_circle'].addEventListener('click', () => {
            keyElements['check_circle'].classList.add('keyboard__key-active')
            setTimeout(() => keyElements['check_circle'].classList.remove('keyboard__key-active'), 150)
            keyboardElement.classList.add('keyboard--hidden')
        })
        return
    }

    if (e.key === 'Shift') {
        keyElements = [...document.querySelectorAll('.keyboard__key')].reduce((res, el) => {
            if (res[el] === undefined) {
                if (el.children.length === 1) res[el.children[0].innerHTML.toLowerCase()] = el
                else res[el.innerHTML.toLowerCase()] = el
            }
            return res
        }, {})
        keyElements['keyboard_arrow_up'].classList.add('keyboard__key-active')
        setTimeout(() => keyElements['keyboard_arrow_up'].classList.remove('keyboard__key-active'), 150)
        keyElements['check_circle'].addEventListener('click', () => {
            keyElements['check_circle'].classList.add('keyboard__key-active')
            setTimeout(() => keyElements['check_circle'].classList.remove('keyboard__key-active'), 150)
            keyboardElement.classList.add('keyboard--hidden')
        })
        return
    }

    if (e.key === 'Backspace' || e.key === 'Enter' || e.key === ' ') {
        if (e.key === 'Enter') {
            keyElements['keyboard_return'].classList.add('keyboard__key-active')
            setTimeout(() => keyElements['keyboard_return'].classList.remove('keyboard__key-active'), 150)
        } else if (e.key === ' ') {
            keyElements['space_bar'].classList.add('keyboard__key-active')
            setTimeout(() => keyElements['space_bar'].classList.remove('keyboard__key-active'), 150)
        } else {
            keyElements[e.key.toLowerCase()].classList.add('keyboard__key-active')
            setTimeout(() => keyElements[e.key.toLowerCase()].classList.remove('keyboard__key-active'), 150)
        }
        textArea.focus()
        properties.cursorPos = textArea.selectionStart
        properties.value = textArea.value
        return
    }

    if (defaultKeys.some((element) => element.includes(e.key.toLowerCase()))) {
        if (e.key === '&' && keyElements['&amp;'] !== undefined) keyElements['&amp;'].classList.add('keyboard__key-active')
        else {
            if (keyElements[e.key.toLowerCase()] !== undefined) keyElements[e.key.toLowerCase()].classList.add('keyboard__key-active')
        }
        textArea.focus()
        properties.cursorPos = textArea.selectionStart
        properties.value = textArea.value
        setTimeout(() => {
            if (e.key === '&') keyElements['&amp;'].classList.remove('keyboard__key-active')
            else keyElements[e.key.toLowerCase()].classList.remove('keyboard__key-active')
        }, 150)
    }

    if (shiftDefaultKeys.some((element) => element.includes(e.key.toLowerCase()))) {
        textArea.focus()
        properties.cursorPos = textArea.selectionStart
        properties.value = textArea.value
    }
})

textArea.addEventListener('click', (e) => {
    keyboardElement.classList.remove('keyboard--hidden')
    properties.cursorPos = e.target.selectionStart
})


textArea.addEventListener('keyup', (e) => {
    keyboardElement.classList.remove('keyboard--hidden')

    if (e.key === 'ArrowLeft') {
        keyElements['keyboard_arrow_left'].classList.add('keyboard__key-active')
        setTimeout(() => keyElements['keyboard_arrow_left'].classList.remove('keyboard__key-active'), 150)
        properties.cursorPos = e.target.selectionStart
        return
    }

    if (e.key === 'ArrowRight') {
        keyElements['keyboard_arrow_right'].classList.add('keyboard__key-active')
        setTimeout(() => keyElements['keyboard_arrow_right'].classList.remove('keyboard__key-active'), 150)
        properties.cursorPos = e.target.selectionStart
        return
    }
})
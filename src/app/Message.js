let hideTimeout
let closeTimeout

const createErrorMessage = (time, title, sub, type) => {
  let doesExist = true
  let root = document.getElementById("mesCont")
  let existing = document.getElementById("message")
  clearTimeout(hideTimeout)
  clearTimeout(closeTimeout)
  if (existing) {
    root.removeChild(existing)
  }
  let cont = document.createElement("div")
  cont.id = "message"
  cont.onclick = () => {
    root.removeChild(cont)
    doesExist = false
  }
  cont.classList.add(type)
  let t = document.createElement("h1")
  t.innerText = title
  cont.appendChild(t)
  if (sub) {
    let s = document.createElement("a")
    s.innerText = sub
    cont.appendChild(s)
  }
  root.appendChild(cont)

  hideTimeout = setTimeout(() => {
    if (doesExist) {
      cont.classList.add("closing")
    }
  }, time * 1000 - 500)
  closeTimeout = setTimeout(() => {
    if (doesExist) {
      root.removeChild(cont)
    }
  }, time * 1000)
}
export { createErrorMessage }

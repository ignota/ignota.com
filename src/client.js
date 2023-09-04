import 'video-react/dist/video-react.css'
import FontFaceObserver from 'fontfaceobserver/fontfaceobserver.standalone'
import ReactGA from 'react-ga'
import { setAutoFreeze } from 'immer'

setAutoFreeze(__DEV__)

if (process.env.NODE_ENV === 'production') ReactGA.initialize('UA-131532060-1')

;(() => {
  require('vendor/gsap')
  require('app')
})()

const canStoreIn = storage => {
  try {
    const store = window[storage]
    const key = '__storage_test__'

    store.setItem(key, 'ok')
    store.removeItem(key)

    return true
  } catch {
    return false
  }
}

const CRITICAL_ACCENT = [
  { family: 'Maison Neue', weight: 300 },
  { family: 'Maison Neue', weight: 400 },
  { family: 'Maison Neue', weight: 600 },
  { family: 'Maison Neue', weight: 700 },
]

const CRITICAL_PRIMARY = [
  { family: 'Charlie Pro', weight: 200 },
  { family: 'Charlie Pro', weight: 400 },
]

const importAccent = async () => {
  try {
    require('vendor/fonts/maison/index.css')

    if (!localStorage.getItem('accent')) {
      const observers = CRITICAL_ACCENT.map(spec => {
        const { family, ...opts } = spec
        const observer = new FontFaceObserver(family, opts)
        return observer.load()
      })

      await Promise.all(observers)

      if (!__DEV__ && canStoreIn('localStorage')) localStorage.setItem('accent', 'true')
    }

    return true
  } catch {
    return false
  }
}

const importPrimary = async () => {
  try {
    require('vendor/fonts/charlie/index.css')

    if (!localStorage.getItem('primary')) {
      const observers = CRITICAL_PRIMARY.map(spec => {
        const { family, ...opts } = spec
        const observer = new FontFaceObserver(family, opts)
        return observer.load()
      })

      await Promise.all(observers)

      if (!__DEV__ && canStoreIn('localStorage')) localStorage.setItem('primary', 'true')
    }

    return true
  } catch {
    return false
  }
}

Promise.all([
  importAccent(),
  importPrimary(),
]).then(([accent, primary]) => {
  const html = document.querySelector('html')

  requestAnimationFrame(() => {
    if (accent) html.classList.add('accent')
    if (primary) html.classList.add('primary')
  })
})

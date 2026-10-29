import { useEffect, useState } from 'react'

const Toast = () => {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handler = (event: Event) => {
      const custom = event as CustomEvent<string>
      setMessage(custom.detail)
      setVisible(true)
      window.clearTimeout((window as any).__starlight_toast)
      ;(window as any).__starlight_toast = window.setTimeout(() => setVisible(false), 2600)
    }
    window.addEventListener('starlight:toast', handler)
    return () => window.removeEventListener('starlight:toast', handler)
  }, [])

  return <div className={`toast ${visible ? 'show' : ''}`}>{message}</div>
}

export default Toast

export function toast(message: string) {
  window.dispatchEvent(new CustomEvent('starlight:toast', { detail: message }))
}

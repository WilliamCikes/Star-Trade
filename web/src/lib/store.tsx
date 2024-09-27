import { atom } from 'jotai'
export interface Shares {
  key: string
  name: string
  shareType: string
  amount: number
}
// helper function to create an atom with local storage
export const atomWithLocalStorage = (key, initialValue) => {
  const getInitialValue = () => {
    const item = localStorage.getItem(key)
    if (item !== null) {
      return JSON.parse(item)
    }
    return initialValue
  }
  const baseAtom = atom(getInitialValue())
  const derivedAtom = atom(
    (get) => get(baseAtom),
    (get, set, update) => {
      const nextValue =
        typeof update === 'function' ? update(get(baseAtom)) : update
      set(baseAtom, nextValue)
      localStorage.setItem(key, JSON.stringify(nextValue))
    }
  )
  return derivedAtom
}

// selectors
export const sharesAtom = atomWithLocalStorage('shares', [])

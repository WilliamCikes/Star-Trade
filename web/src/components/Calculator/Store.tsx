import { atom } from 'jotai'

export type uec = number
export type citizens = number

export const uecAtom = atom<uec>(0)

export const citizensAtom = atom<citizens>(0)

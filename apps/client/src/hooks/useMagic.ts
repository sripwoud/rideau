import {  useContext } from 'react'
import { MagicContext } from '@client/p/MagicProvider'

export const useMagic = () => useContext(MagicContext)

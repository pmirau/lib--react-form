import { Inputs } from '../../types'

interface Group {
  id: string,
  title: string
}

export interface DataInputGroup<T extends Inputs> extends Group {
  inputs: T[]
}

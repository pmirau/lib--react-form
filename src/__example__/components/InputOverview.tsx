import React from 'react'
import textData from '../data/inputs/text.json'
import numberData from '../data/inputs/number.json'
import checkboxData from '../data/inputs/checkbox.json'
import useForm from '../../hooks/useForm'
import InputSelector from '../../components/inputs/InputSelector'
import { InputType } from '../../types'
import styles from './InputOverview.module.scss'

const data = [textData, numberData, checkboxData]

const InputOverview = () => {
  const { register } = useForm()

  return (
    <div className={styles.inputOverview}>
      <h1>Input Examples</h1>
      <p>! Test focus manually</p>
      {data.map((typeGroup) => (
        <React.Fragment key={typeGroup.id}>
          <h2>{typeGroup.title}</h2>
          <div>
            {typeGroup.inputs.map(({
              // component: Component,
              id,
              type,
              rest,
              registerProps,
            }) => (
              <InputSelector
                key={id}
                {...register(id, {
                  type: type as InputType,
                  ...registerProps,
                })}
                {...rest}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default InputOverview

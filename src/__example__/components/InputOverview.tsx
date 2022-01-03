import React from 'react'
import textData from '../data/inputs/text.json'
import numberData from '../data/inputs/number.json'
import checkboxData from '../data/inputs/checkbox.json'
import checkboxGroupData from '../data/inputs/checkboxGroup.json'
import { DataInputGroup, DataInputs } from './InputOverview.types'
import useForm from '../../hooks/useForm'
import InputSelector from '../../components/inputs/InputSelector'
import styles from './InputOverview.module.scss'

// Workaround for ts error
type Checkboxes = DataInputs['checkboxGroup']['checkboxes']

const data = [
  textData as DataInputGroup<DataInputs['text']>,
  numberData as DataInputGroup<DataInputs['number']>,
  checkboxData as DataInputGroup<DataInputs['checkbox']>,
  checkboxGroupData as DataInputGroup<DataInputs['checkboxGroup']>,
]

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
              type,
              id,
              initialValue,
              touched,
              changed,
              validation,
              validationSchema,
              label,
              ...rest
            }) => {
              // Hacky way to silence ts errors
              let checkboxes
              if ('checkboxes' in rest) {
                // eslint-disable-next-line no-param-reassign
                ({ checkboxes, ...rest } = rest)
              }

              return (
                <React.Fragment key={id}>
                  <InputSelector
                    {...register(id, {
                      type,
                      initialValue,
                      touched,
                      changed,
                      validation,
                      validationSchema,
                    })}
                    {...rest}
                    // Exclamation mark to silence TS error
                    label={label!}
                    // Silence TS error
                    {...(checkboxes as Checkboxes && { checkboxes: checkboxes as Checkboxes })}
                  />
                </React.Fragment>
              )
            })}
          </div>
        </React.Fragment>
      ))}
    </div>
  )
}

export default InputOverview

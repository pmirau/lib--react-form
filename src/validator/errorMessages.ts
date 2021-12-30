import { LanguageMessages } from 'joi'
import { ValidationParams } from '../types'

type CustomMessages = {
  [key in keyof ValidationParams]: { [key: string]: string }
}

const messagesDE: LanguageMessages = {
  'any.required': 'Dieses Feld ist erforderlich',
  'string.email': 'Bitte gebe eine gültige E-Mail Adresse ein',
  'string.min': 'Bitte gebe mindestens {{#limit}} Zeichen ein',
  'string.max': 'Bitte gebe maximal {{#limit}} Zeichen ein',
  'string.alphanum': 'Bitte gebe nur alpha-numerische Zeichen ein (a-z, A-Z, 0-9)',
  'string.pattern.base': 'Bitte gebe nur gültige Zeichen ein',
  'number.base': 'Bitte gebe eine gültige Zahl ein',
  'number.min': 'Bitte gebe mindestens die Zahl {{#limit}} ein',
  'number.max': 'Bitte gebe maximal die Zahl {{#limit}} ein',
}

export default { de: messagesDE }

// Used to define the message directly on the validator itself
export const customMessagesDE: CustomMessages = {
  checked: {
    true: 'Dieses Feld muss ausgewählt sein',
    false: 'Dieses Feld darf nicht ausgewählt sein',
  },
}

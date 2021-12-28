import deepEqual from 'deep-equal'

/**
 * Removes the property 'key' from 'object'
 */
export const removePropFromObject = <T>(
  key: string,
  object: { [key: string]: T },
): { [key: string]: T } => {
  const { [key]: omit, ...newObject } = object
  return newObject
}


/**
 * Checks if at least one value in 'values' is truthy
 */
export const hasSome = (values: { [key: string]: any }): boolean => {
  return Object.values(values).some((value) => !!value)
}

/**
 * Compares a and b deeply
 */
export const isEqual = (a: any, b: any): boolean => {
  return deepEqual(a, b)
}

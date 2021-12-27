import deepEqual from 'deep-equal';

/**
 * Removes the property 'key' from 'object'
 * @param {string} key
 * @param {Object} object
 */
export const removePropFromObject = (key, object) => {
  const { [key]: omit, ...newObject } = object;
  return newObject;
};


/**
 * Checks if at least one value in 'values' is truthy
 * @return {boolean}
 */
export const hasSome = (values) => {
  return Object.values(values).some((value) => !!value === true);
};

/**
 * Compares a and b deeply
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
export const isEqual = (a, b) => {
  return deepEqual(a, b);
};

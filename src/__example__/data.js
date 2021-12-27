import { TYPE } from '../constants/inputs';

const text = {
  type: TYPE.text,
  title: 'Text',
  inputs: [
    {
      id: 'default',
      rest: {
        label: 'Default',
      },
    },
    {
      id: 'with-placeholder',
      rest: {
        label: 'With Placeholder',
        placeholder: 'With Placeholder',
      },
    },
    {
      id: 'with-initial-value',
      registerProps: {
        initialValue: 'With Initial Value',
      },
      rest: {
        label: 'With Initial Value',
      },
    },
    {
      id: 'with-error',
      registerProps: {
        initialValue: 'ab',
        validation: {
          minLength: 10,
        },
        touched: true,
      },
      rest: {
        label: 'With Error',
        placeholder: 'With Error',
      },
    },
    {
      id: 'with-disabled',
      registerProps: {
        initialValue: 'abc',
      },
      rest: {
        label: 'With Disabled',
        placeholder: 'With Disabled',
        disabled: true,
      },
    },
  ],
};

const number = {
  type: TYPE.number,
  title: 'Number',
  inputs: [
    {
      id: 'default',
      rest: {
        label: 'Default',
      },
    },
    {
      id: 'with-placeholder',
      rest: {
        label: 'With Placeholder',
        placeholder: 'With Placeholder',
      },
    },
    {
      id: 'with-initial-value',
      registerProps: {
        initialValue: '777',
      },
      rest: {
        label: 'With Initial Value',
      },
    },
    {
      id: 'with-error',
      registerProps: {
        initialValue: '776',
        validation: {
          min: 777,
        },
        touched: true,
      },
      rest: {
        label: 'With Error',
        placeholder: 'With Error',
      },
    },
    {
      id: 'with-disabled',
      registerProps: {
        initialValue: '888',
      },
      rest: {
        label: 'With Disabled',
        placeholder: 'With Disabled',
        disabled: true,
      },
    },
  ],
};

/**
 * @param {Object} typeGroup
 */
const withEnrichedProps = (typeGroup) => {
  const newInputs = typeGroup.inputs.map((input) => (
    {
      ...input,
      id: `${typeGroup.type}--${input.id}`,
      type: typeGroup.type,
    }
  ));

  return {
    ...typeGroup,
    inputs: newInputs,
  };
};

export default [
  withEnrichedProps(text),
  withEnrichedProps(number),
];

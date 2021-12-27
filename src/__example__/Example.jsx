import React from 'react';
import PropTypes from 'prop-types';
import useForm from '../hooks/useForm';
import data from './data';
import { TYPE } from '../constants/inputs';
import InputSelector from '../components/inputs/InputSelector';

const Example = props => {
  const { form, register } = useForm();

  return (
    <div>
      <h1>Input Examples</h1>
      {data.map((typeGroup) => (
        <React.Fragment key={typeGroup.type}>
          <h2>{typeGroup.title}</h2>
          <div>
            {typeGroup.inputs.map(({
              // component: Component,
              id,
              rest,
              registerProps,
            }) => (
              <InputSelector
                key={id}
                inputType={typeGroup.type}
                {...register(id, {
                  type: typeGroup.type,
                  ...registerProps,
                })}
                {...rest}
              />
            ))}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

Example.propTypes = {

};

export default Example;

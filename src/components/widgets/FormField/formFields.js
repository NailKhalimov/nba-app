import React from 'react';
import styles from './formFields.css';

const FormFields = ({formData, change, id}) => {

  const renderTemplate = () => {
    let formTemplate = null;

    switch(formData.element) {
      case('input'):
        formTemplate = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onChange={(event) => change({event, id, blur: false})}
              onBlur={(event) => change({event, id, blur: true})}
            />
          </div>
        )
        break;
        default:
          formTemplate = null;
    }

    return formTemplate;
  }

  return (
    <div>
      {renderTemplate()}
    </div>
  )
}

export default FormFields;
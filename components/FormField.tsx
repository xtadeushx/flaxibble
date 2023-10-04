import React from 'react'

interface FormFieldProps {
  title: string;
  state: string;
  placeholder: string;
  setState: (value: string) => void
  isTeatArea?: boolean;
  type?: string;

}

const FormField: React.FC<FormFieldProps> = ({ title, state, setState, placeholder, isTeatArea, type }) => {
  return (
    <div className='flexStart flex-col w-full gap-4'>
      <label htmlFor={title} className='w-full text-gray-100'>
        {title}
      </label>
      {isTeatArea ? (
        <textarea
          placeholder={placeholder}
          value={state}
          required
          className='form_field-input'
          onChange={(e) => setState(e.target.value)}
        />
      ) : (
        <input
          type={type || 'text'}
          placeholder={placeholder}
          value={state}
          required
          className='form_field-input'
          onChange={(e) => setState(e.target.value)}
        />
      )
      }
    </div>
  )
}

export default FormField
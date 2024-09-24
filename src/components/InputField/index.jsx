import React from 'react';
import './index.css'; // CSSファイルをインポート

const InputField = ({ value, setValue, placeholder }) => {
  const handleChange = (e) => setValue(e.target.value);

  return (
    <fieldset className={`form-fieldset ui-input ${value ? 'filled' : ''}`}>
      <input
        type="text"
        id="username"
        value={value}
        onChange={handleChange}
        className={value ? 'filled' : ''}
        placeholder={placeholder}
      />
      <label htmlFor="username"></label>
    </fieldset>
  );
};

export default InputField;

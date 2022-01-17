import React, { useState, useEffect } from "react";

import "./Form.css";
const Form = () => {
  const intialValues = { username: "", number: "" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(formValues);
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};

    if (!values.username.trim()) {
      errors.username = "Empty.Type username";
    }

    if (!values.number) {
      errors.number = "Type number";
    } else if (values.number.length !== 12) {
      errors.number = "Number must be 12 characters";
    }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container">
      <h1>Добро пожаловать!</h1>
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">Successfully</span>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <input
            type="text"
            name="username"
            id="username"
            value={formValues.username}
            onChange={handleChange}
            className={formErrors.username && "input-error"}
            placeholder="Имя*"
          />
          {formErrors.username && (
            <span className="error">{formErrors.username}</span>
          )}
        </div>

        <div className="form-row">
          <input
            type="text"
            name="number"
            id="number"
            value={formValues.number}
            onChange={handleChange}
            className={formErrors.number && "input-error"}
            placeholder="Телефон*"
          />
          {formErrors.number && (
            <span className="error">{formErrors.number}</span>
          )}
        </div>

        <button type="submit">ВОЙТИ</button>
      </form>
    </div>
  );
};

export default Form;

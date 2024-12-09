import React from 'react'
import validator from "validator";


export const validateFormData = ({ formData, keys }) => {
    for (let i = 0; i < keys.length; i++) {
      const { name, errorMessage } = keys[i];
      if (!(name in formData) || formData[name] === null || formData[name] === undefined || formData[name] === "") {
        return { isValid: false, errorMessage };
      }
    }
    return { isValid: true };
  };

  export const validatePassword = ( password) => {
   // Regular expression to check for at least 8 characters, 1 number, and 1 uppercase letter
   const regex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@#$%^&*!]{8,}$/;

   // Return true if password is valid, false otherwise
   return regex.test(password);
  };
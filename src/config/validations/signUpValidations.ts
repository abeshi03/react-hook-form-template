export const signUpValidations = {

  email: {
    required: true,
    regexp: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/
  },

  password: {
    required: true,
    minLength: 6,
    maxLength: 36
  }
};

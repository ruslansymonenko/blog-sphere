const authFormValidation = (email, password, name) => {
  const validationResult = {
    validation: false,
    message: '',
    errorField: ''
  }

  let checkValidation = false;
  let errorMessage = '';
  let error = '';

  let errorsCounter = 0;

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    return passwordRegex.test(password);
  }

  const validateName = (name) => {
    if(name && typeof name === 'string') {
      return true
    } else {
      return false
    }
  }

  if (!name) {
    errorMessage = 'Name is required';
    error = 'name';
    errorsCounter++;
  }

  if (!email) {
    errorMessage = 'Email is required';
    error = 'email';
    errorsCounter++;
  }

  if (!password) {
    errorMessage = 'Password is required';
    error = 'password';
    errorsCounter++;
  }

  if (email && password) {
    let emailCheck = validateEmail(email);
    let passwordCheck = validatePassword(password);
    let nameCheck = validateName(name);

    if (!emailCheck) {
      errorMessage = 'Email is not correct';
      error = 'email';
      errorsCounter++;
    }

    if(!passwordCheck) {
      errorMessage = 'Password is too simple';
      error = 'password';
      errorsCounter++;
    }

    if (emailCheck && passwordCheck && nameCheck) {
      errorsCounter = 0;
    }
  }

  if (errorsCounter === 0) {
    return {
      ...validationResult,
      validation: true,
      message: 'Your data has been sent',
      errorField: ''
    }
  } else if (errorsCounter === 1) {
    return {
      ...validationResult,
      validation: checkValidation,
      message: errorMessage,
      errorField: error
    }
  } else if (errorsCounter > 1) {
    return {
      ...validationResult,
      validation: false,
      message: 'Please, fill all inputs and check one more time your email an password',
      errorField: 'all'
    }
  }
}

export default authFormValidation;
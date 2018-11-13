
function validateName() {
    // set a regular expression variable to check match against the user input in name
    // capital letter, lower case letter, space or hyphons are allowed
  const reg = /^[A-Za-z][A-Za-záéíóú']*$/;

    // the test() method checks that the value entered
    // in the input with a class of name matches the regular expression
  if (reg.test(document.querySelector('.name').value)) {
        // if all the characters from the user entered input match
    return true;
  }
  // if any of the characters from the user entered input do not match
  return false;
}


function styleNameOkay() {
    // set up a variable to target a class on the name input
  const nameValidate = $('.hf_nameValidation');
  // set up a variable to target a class on the name error span
  const nameMessage = $('.hf_nameMessage');
    // set the name input to have a red background
  nameValidate.addClass('validationOkay');
  nameValidate.removeClass('validationError');
    // set the error span not to appear
  nameMessage.addClass('nameOkay');
  nameMessage.removeClass('nameError');
}

function styleNameError() {
    // set up a variable to target a class on the name input
  const nameValidate = $('.hf_nameValidation');
    // set up a variable to target a class on the name error span
  const nameMessage = $('.hf_nameMessage');
    // set the name input to have a red background
  nameValidate.removeClass('validationOkay');
  nameValidate.addClass('validationError');
    // set the span on name error to appear
  nameMessage.addClass('nameError');
  nameMessage.removeClass('nameOkay');
}

// setup a function to call the validateName and
// styleNameError or styleNameOkay functions at the same time
function checkName(nameElement) {
  const isValid = validateName();

  if (isValid === false) {
    styleNameError(nameElement);
  } else {
    styleNameOkay();
  }
}

function validateEmail() {
    // set a regular expression variable to check match against the user input in email
  const reg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    // using test() check that the user entered email
    // matches the characters in the regular expression variable
  if (reg.test(document.querySelector('.email').value)) {
        // if the user entered email matches the characters
    return true;
  }
        // if the user entered email does not match the regular expression
  return false;
}

function styleEmail() {
    // set up a variable to target a class on the email input
  const emailValidate = $('.hf_emailValidation');
    // set up a variable to target a class on the email error span
  const emailError = $('.hf_emailMessage');
  // set up a variable to contain the email validation function
  const isValid = validateEmail();

  if (isValid === true) {
        // if the user entered email matches the characters
        // set the style of the input to have a green background
    emailValidate.addClass('validationOkay');
    emailValidate.removeClass('validationError');
        // set the span on email error to be hidden
    emailError.addClass('emailOkay');
    emailError.removeClass('emailError');
  } else {
        // if the user entered email does not match the regular expression
        // set the style of the input to have a red background
    emailValidate.removeClass('validationOkay');
    emailValidate.addClass('validationError');
        // set the span on email error to appear
    emailError.addClass('emailError');
    emailError.removeClass('emailOkay');
  }
}

// setup a function to call the validateEmail and
// styleEmail functions at the same time
function checkEmail() {
  validateEmail();
  styleEmail();
}

// function to display an error message if
// the captcha has not been clicked on
function styleCaptcha() {
  const verifyRecaptcha = document.getElementById('g-recaptcha-response').value;
  const errorMessage = $('.hf_captchaMessage');
    // If the recaptcha has not been verified
  if (!verifyRecaptcha) {
        // display an error message
    errorMessage.removeClass('captchaOkay');
    errorMessage.addClass('captchaError');
  }
}

function validateForm() {
    // create an error count variable set to 0
    // use let on count variables
  let error = 0;
  const verifyRecaptcha = document.getElementById('g-recaptcha-response').value;
  // set up a form variable and traverse the form to find the classes
  const targetForm = $("form[name='featureForm']");
  const targetName = targetForm.find('.name');
  const targetEmail = targetForm.find('.email');

    // if the validate name function on the name input field returns false
  if (!validateName(targetName)) {
        // increase the error counter by 1
    error += 1;
  }

    // if the validate email function on the input with a class of 'email' returns false
  if (!validateEmail(targetEmail)) {
        // increase the error counter by 1
    error += 1;
  }

    // If the error counter is greater than 0 then dont submit the form
  if (error > 0) {
    return false;
  }

    // If the recaptcha has been verified
  if (verifyRecaptcha) {
        //  submit the form
    return true;
  }
  // show captcha error message
  styleCaptcha();
  // do not submit the form
  return false;
}
function validateAndSubmitForm(event) {
  const form = event.target;

  const isValid = validateForm();
  if (isValid) {
    form.submit();
    return true;
  }
  return false;
}


// call the checkName function onblur on the element with a class of name
function setupBlurName() {
  $("form[name='featureForm']").find('.name').blur(checkName);
}

// call the checkEmail function onblur on the element with a class of email
function setupBlurEmail() {
  $("form[name='featureForm']").find('.email').blur(checkEmail);
}

function setupSubmitHandler() {
  $("form[name='featureForm']").submit(validateAndSubmitForm);
}

// call the functions in JQuery
window.hfQueueJquery(setupBlurName);
window.hfQueueJquery(setupBlurEmail);
window.hfQueueJquery(setupSubmitHandler);

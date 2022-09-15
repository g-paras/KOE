export const emailValidator = (email) => {
  if (!email) return "Username is required";
  const pattern = /^[a-z]{2,15}\.[0-9]{4}[a-z]{2,3}[0-9]{2,4}$/i;
  if (!pattern.test(email)) return "Enter a valid email";
  return false;
};

export const passwordValidator = (password) => {
  if (!password) return "Password is required";
  const pattern = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!pattern.test(password))
    return "Password must contain a digit, uppercase, lowercase & a special character";
  return false;
};

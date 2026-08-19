export const validateName = (name) => {
  if (!name) return "Name is required.";
  if (name.length < 6) return "Name must be at least 6 characters.";
  if (!/^[A-Za-z\s]+$/.test(name)) return "Name must contain letters only.";
  return "";
};

// Email: required, valid format.
export const validateEmail = (email) => {
  if (!email) return "Email is required.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Enter a valid email address.";
  return "";
};

// Password: required, min 8, 1 upper, 1 lower, 1 number, 1 special char.
export const validatePassword = (password) => {
  if (!password) return "Password is required.";
  const strong =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!strong.test(password))
    return "Min 8 chars with upper, lower, number & special character.";
  return "";
};

// Login password: required only (no strength check on login).
export const validateRequired = (value, field = "This field") =>
  value ? "" : `${field} is required.`;
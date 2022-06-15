export const isRequiredFieldValid = (value: string) => {
  return value != null && value !== ""
}

export const isFormValid = (
  name: string,
  selectedCategory: string,
  selectedTime: string
): boolean => {
  if (!isRequiredFieldValid(name)) {
    return false
  }
  if (!isRequiredFieldValid(selectedCategory)) {
    return false
  }
  if (!isRequiredFieldValid(selectedTime)) {
    return false
  }

  return true
}

export const isRequiredFieldValidCheck = (value: string) => {
  if (value != null && value !== "") {
    return true
  }
  return false
}

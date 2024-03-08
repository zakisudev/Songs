export const checkCharLength = (
  input: string,
  setError: (value: string) => void,
  error: string
) => {
  if (input.length < 3 || input.length > 20 || input === '') {
    setError(`${error} must be 3 to 20 characters`);
    return;
  }
  return true;
};

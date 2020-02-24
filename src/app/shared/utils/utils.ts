export function handleCognitoError(error) {
  return `error${camelToSnakeCase(error.code)}`;
}

export function camelToSnakeCase(str) {
  return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
}

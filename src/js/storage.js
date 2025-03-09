export function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
export function getData(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
  //   if (data) {
  //     return JSON.parse(data);
  //   }
  //   return null;
}
export function clearData(key) {
  localStorage.removeItem(key);
}

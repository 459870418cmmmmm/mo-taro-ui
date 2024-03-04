export async function getRectByTaro(taroElement) {
  if (taroElement) {
    return await taroElement.getBoundingClientRect();
  }
  return Promise.resolve({});
}

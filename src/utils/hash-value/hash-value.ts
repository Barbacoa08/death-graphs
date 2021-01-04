// method adapted from this: https://stackoverflow.com/a/8076436/1022765
export const hashValue = (
  obj: string | number | Record<never, never> | []
): string => {
  const str = JSON.stringify(obj);
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const character = str.charCodeAt(i);
    hash = (hash << 5) - hash + character;
    hash = hash & hash; // Convert to 32bit integer
  }
  return `${hash}`;
};

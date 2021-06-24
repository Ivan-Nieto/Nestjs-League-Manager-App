export const validObject = (data?: any) => {
  if (!data || typeof data !== 'object' || Array.isArray(data)) return false;
  return true;
};

export default validObject;

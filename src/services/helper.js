export const handleRequest = async (promise) => {
  try {
    const res = await promise;
    return [res.data, null];
  } catch (error) {
    return [null, error.response.data];
  }
};

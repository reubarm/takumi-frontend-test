const fetchData = async (type: string) => {
  const EXPRESS_SERVER = process.env.REACT_APP_SERVER_URL;
  try {
    const response = await fetch(`${EXPRESS_SERVER}${type}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred");
  }
};

export default fetchData;

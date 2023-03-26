const fetchData = async (type: string) => {
  try {
    const response = await fetch(`http://localhost:3001/${type}/`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred");
  }
};

export default fetchData;

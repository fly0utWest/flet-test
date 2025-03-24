const jsonLoader = async (endpoint: string) => {
  const API_URL = "https://jsonplaceholder.typicode.com/";

  const response = await fetch(`${API_URL}/${endpoint}`);

  if (!response.ok) {
    throw new Error("Data fetchong has gone wrong.");
  }

  const data = await response.json();
  return data;
};

export default jsonLoader;

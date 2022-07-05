import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  const [countriesData, setCountriesData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(16);
  const currentArray = countriesData.slice(
    page * perPage,
    (page + 1) * perPage
  );

  console.log(currentArray);
  const url = "https://restcountries.com/v3.1/all";
  async function fetchData() {
    setIsRefreshing(true);
    try {
      const res = await axios.get(url);
      setCountriesData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setTimeout(() => {
      fetchData();
      setIsRefreshing(false);
    }, 1000);
  }, []);

  const paginate = (index, e) => {
    setIsLoading(true);
    e.preventDefault();
    setTimeout(() => {
      setPage(index);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <GlobalContext.Provider
      value={{
        countriesData,
        setCountriesData,
        isLoading,
        setIsLoading,
        page,
        setPage,
        paginate,
        perPage,
        setPerPage,
        currentArray,
        isRefreshing,
        setIsRefreshing
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobal = () => useContext(GlobalContext);

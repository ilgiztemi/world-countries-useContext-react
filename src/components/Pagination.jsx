import { useGlobal } from "../context/GlobalContext";
const Pagination = () => {
  const { paginate, perPage, countriesData, isLoading } = useGlobal();
  const number = [];
  const total = countriesData.length;
  for (let i = 1; i < Math.ceil(total / perPage); i++) {
    number.push(i);
  }
  return (
    <nav>
      <h1>Pagination</h1>
      <ul className="pagination">
        {isLoading
          ? "Loading..."
          : number.map((el) => (
              <li className="page-item" key={el}>
                <a
                  href=""
                  className="page-link"
                  onClick={(e) => paginate(el, e)}
                >
                  {el}
                </a>
              </li>
            ))}
      </ul>
    </nav>
  );
};

export default Pagination;

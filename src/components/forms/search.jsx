/* eslint-disable react/prop-types */
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const Search = ({ placeholder, searchParams }) => {
  const navigate = useNavigate();

  const handleSearch = debounce((e) => {
    const params = new URLSearchParams(searchParams);

    if (e.target.value < 1) {
      params.delete("query");
    } else {
      params.set("query", e.target.value);
    }
    navigate(`${location.pathname}?${params.toString()}`);
  }, 300);

  return (
    <input
      defaultValue={searchParams?.get("query")}
      type="text"
      className="form-control"
      placeholder={placeholder}
      style={{ width: "250px" }}
      name="search"
      onChange={(e) => handleSearch(e)}
      autoComplete="off"
    />
  );
};

export default Search;

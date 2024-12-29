/* eslint-disable react/prop-types */
import clsx from "clsx";
import { useNavigate } from "react-router-dom";

const Pagination = ({ page, totalData, totalPages, searchParams }) => {
  const LIMIT = 5;
  const currentData = page * LIMIT;
  const navigate = useNavigate();

  const handlePaginate = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);

    navigate(`${location.pathname}?${params.toString()}`, { replace: true });
  };

  return (
    <div>
      <div className="row">
        <div className="col-7">
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-end">
              <li className={clsx("page-item", { disabled: page <= 1 })}>
                <button
                  className="page-link"
                  aria-label="Previous"
                  onClick={() => handlePaginate(page - 1)}
                >
                  <span>&laquo;</span>
                </button>
              </li>

              {Array.from({ length: totalPages }, (e, i) => (
                <li
                  className={clsx("page-item user-select-none", {
                    active: i + 1 == page,
                  })}
                  key={i}
                  onClick={() => handlePaginate(i + 1)}
                >
                  <button className="page-link">{i + 1}</button>
                </li>
              ))}
              <li
                className={clsx("page-item", { disabled: page >= totalPages })}
              >
                <button
                  className="page-link"
                  aria-label="Next"
                  onClick={() => handlePaginate(page + 1)}
                >
                  <span>&raquo;</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="col-5 text-end">
          <small className="d-inline-block fw-medium">
            {currentData >= totalData ? totalData : currentData} from{" "}
            {totalData} data
          </small>
        </div>
      </div>
    </div>
  );
};

export default Pagination;

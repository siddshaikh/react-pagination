import "./styles.css";
import React, { useEffect, useState } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const fetchProducts = async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=10&skip=${page * 10 - 10}`
    );
    const data = await response.json();
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(data.total / 10);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [page]);
  const selectPageHandler = (selectedPage) => {
    if (selectedPage > 1 && selectedPage <= totalPages && selectedPage !== page)
      setPage(selectedPage);
  };
  return (
    <div className="App">
      {products.length > 0 && (
        <div className={"products"}>
          {products.map((prod) => {
            return (
              <span className={"products__single"} key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className={"pagination"}>
          <span
            onClick={() => selectPageHandler(page - 1)}
            className={page > 1 ? "" : "pagination__disable"}
          >
            ◀
          </span>
          {[...Array(totalPages)].map((_, i) => {
            return (
              <span
                onClick={() => selectPageHandler(i + 1)}
                className={page === i + 1 ? " pagination__selected" : " "}
              >
                {i + 1}
              </span>
            );
          })}
          <span
            onClick={() => selectPageHandler(page + 1)}
            className={page < totalPages ? "" : "pagination__disable"}
          >
            ▶
          </span>
        </div>
      )}
    </div>
  );
}

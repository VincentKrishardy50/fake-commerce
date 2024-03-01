import "../App.css";

export default function Pagination({ paging, clickPage }) {
  return (
    <nav className="my-4">
      <ul className="flex justify-center">
        {paging.map((page) => (
          <li key={page}>
            {page === 1 ? (
              <button type="button"
                id={`page_${page}`}
                className="mx-1 px-6 py-4 rounded shadow text-white bg-black font-bold"
                style={{ border: "1px solid black" }}
                onClick={clickPage}
              >
                {page}
              </button>
            ) : (
              <button type="button"
                id={`page_${page}`}
                className="mx-1 px-6 py-4 rounded shadow text-black bg-white"
                style={{ border: "1px solid black" }}
                onClick={clickPage}
              >
                {page}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

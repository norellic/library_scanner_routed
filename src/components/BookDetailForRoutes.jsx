import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BookDetailForRoutes() {
  //serach using - instead of / 
  const { key } = useParams();
  const openLibraryKey = key.replace("-", "/"); // "works/OL723491W"

  const [fullDetails, setFullDetails] = useState(null);

  useEffect(() => {
    const getBookDetails = async () => {
      const response = await fetch(`https://openlibrary.org/${openLibraryKey}.json`);
      const json = await response.json();
      setFullDetails(json);
    };

    getBookDetails().catch(console.error);
  }, [key]);

  if (!fullDetails) {
    return <p>Loading book details...</p>;
  }

  const coverUrl = fullDetails.covers
    ? `https://covers.openlibrary.org/b/id/${fullDetails.covers[0]}-M.jpg`
    : null;

  return (
    <div>
      <h2>{fullDetails.title}</h2>
      {coverUrl ? (
        <img src={coverUrl} alt={`${fullDetails.title} cover`} />
      ) : (
        <p>No cover available</p>
      )}
      {fullDetails.description && (
        <p>
          {typeof fullDetails.description === "string"
            ? fullDetails.description
            : fullDetails.description.value}
        </p>
      )}
    </div>
  );
}

export default BookDetailForRoutes;

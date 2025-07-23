import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const BookDetail = ({ title, author, year, cover_id, keyForUrl }) => {

  const openLibraryKey = keyForUrl.slice(1).replace("/", "-"); // "works/OL723491W" -> "works-OL723491W"
  
    return (

      <li className="main-list" key={cover_id}>

        <Link
          style={{ color: "White" }}
          to={`/BookDetailForRoutes/${openLibraryKey}`}
          key={openLibraryKey}
        >

        <p><strong>Title:</strong> {title}</p>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Year:</strong> {year}</p>
      
        </Link>

      </li>
    )
}

  
  
export default BookDetail

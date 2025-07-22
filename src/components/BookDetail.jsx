import { useEffect, useState } from "react"

const BookDetail = ({ title, author, year, cover_id }) => {
  
    return (
      <li className="main-list" key={cover_id}>
        <p><strong>Title:</strong> {title}</p>
        <p><strong>Author:</strong> {author}</p>
        <p><strong>Year:</strong> {year}</p>
      </li>
    )
}

  
  
export default BookDetail

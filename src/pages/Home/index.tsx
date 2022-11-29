import React, { useState, useEffect } from "react";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface IHome {}

interface IBook {
  id : Number,
  name : String,
  author : String,
  read_time : Number,
  rating : Number,
  details : String,
  pdf_name : String,
  thumbnail_name : String
}

const Home: React.FC<IHome> = (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [books , setBooks] = useState<IBook[]>([]);

  const goToAddBook = () => {
    navigate("/add_book");
  };

  const goToBookDetail = (id : number) => {
      navigate(`/get_book/${id}`)
  }

  const getBooks = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}get_books`)
      .then((result) => {
          setBooks(result.data.all_books)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    getBooks();
  }, []);

  return (
    <>
      <div>
        <div className="home-header">
        <i className="fa fa-book"></i> &nbsp;
          <span>My Books</span>
        </div>
        <Container>
          <Row>
            {books?.map((book: any) => (
              <Col xs={2} className="col" key={book.id}>
                <div className="book-thumbnail" onClick = {(e) => goToBookDetail(book.id)}>
                  <img
                    src={`${process.env.REACT_APP_BACKEND_URL_PUBLIC}${book.thumbnail_name}`}
                    alt="thumbnail"
                    className = "thumbnail_image"
                  />
                  <span className="book-thumbnail-name">{book.name}</span>
                  <span className="book-thumbnail-author">{book.author}</span>
                </div>
              </Col>
            ))}
            <Col xs={2} className="col">
              <div className="add-book-thumbnail" onClick={goToAddBook}>
                <span>+</span>
                <em>Add a book</em>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}

export default Home;

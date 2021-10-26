import { Injectable, NotFoundException } from "@nestjs/common";
import { uuid } from "short-uuid";
import { Book } from "./book.model";

@Injectable()
export class BookService {
  private books: Book[] = [];

  insertBook(name: string, author: string, publishYear: number) {
    const bookID = uuid();
    const newBook = new Book(bookID, name, author, publishYear);
    this.books.push(newBook);
    return bookID;
  }

  fetchAllBooks() {
    return [...this.books];
  }

  fetchSingleBook(bookID: string) {
    const [book] = this.findBook(bookID);
    return { ...book };
  }

  editBook(bookID: string, name: string, author: string, publishYear: number) {
    const [book, index] = this.findBook(bookID);
    const updatedBook = { ...book };
    if (name) {
      updatedBook.name = name;
    }
    if (author) {
      updatedBook.author = author;
    }
    if (publishYear) {
      updatedBook.publishYear = publishYear;
    }
    this.books[index] = updatedBook;
  }

  removeBook(bookID: string) {
    const index = this.findBook(bookID)[1];
    this.books.splice(index, 1);
  }

  private findBook(bookID: string): [Book, number] {
    const bookIndex = this.books.findIndex((book) => book.id === bookID);
    const book = this.books[bookIndex];

    if (!book) {
      throw new NotFoundException("Could not find book");
    }
    return [book, bookIndex];
  }
}

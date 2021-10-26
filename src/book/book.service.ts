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

  fetchSingleProduct(bookID: string) {
    const product = this.books.find((book) => book.id === bookID);
    if (!product) {
      throw new NotFoundException("Could not find product");
    }
    return product;
  }
}

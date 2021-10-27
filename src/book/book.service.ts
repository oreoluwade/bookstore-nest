import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Book } from "./book.model";

@Injectable()
export class BookService {
  constructor(@InjectModel("Book") private readonly bookModel: Model<Book>) {}

  async insertBook(name: string, author: string, publishYear: number) {
    const newBook = new this.bookModel({ name, author, publishYear });
    const book = await newBook.save();
    return book.id as string;
  }

  async fetchAllBooks() {
    // exec() returns a real promise
    const books = await this.bookModel.find().exec();
    return books.map((book) => ({
      id: book.id,
      name: book.name,
      publishYear: book.publishYear,
      author: book.author,
    })) as Book[];
  }

  async fetchSingleBook(bookID: string) {
    const book = await this.findBook(bookID);
    return {
      id: book.id,
      name: book.name,
      publishYear: book.publishYear,
      author: book.author,
    };
  }

  async editBook(
    bookID: string,
    name: string,
    author: string,
    publishYear: number,
  ) {
    const updatedBook = await this.findBook(bookID);

    if (name) {
      updatedBook.name = name;
    }
    if (author) {
      updatedBook.author = author;
    }
    if (publishYear) {
      updatedBook.publishYear = publishYear;
    }
    updatedBook.save();
  }

  async removeBook(bookID: string) {
    const result = await this.bookModel.deleteOne({ _id: bookID }).exec();
    if (result.deletedCount === 0) {
      throw new NotFoundException("Could not find book");
    }
  }

  private async findBook(bookID: string): Promise<Book> {
    let book;
    try {
      book = await this.bookModel.findById(bookID).exec();

      if (!book) {
        throw new NotFoundException("Could not find book");
      }
      return book;
    } catch (error) {
      throw new NotFoundException("Could not find book");
    }
  }
}

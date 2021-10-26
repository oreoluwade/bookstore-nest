import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  Delete,
} from "@nestjs/common";
import { BookService } from "./book.service";

@Controller("/book")
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  createBook(
    @Body("name") name: string,
    @Body("author") author: string,
    @Body("publishYear") publishYear: number,
  ): { id: string } {
    const id = this.bookService.insertBook(name, author, publishYear);
    return { id };
  }

  @Get()
  getBooks() {
    return this.bookService.fetchAllBooks();
  }

  @Get(":id")
  getOneBook(@Param("id") bookID: string) {
    return this.bookService.fetchSingleBook(bookID);
  }

  @Patch(":id")
  updateBook(
    @Param("id") bookID: string,
    @Body("name") name: string,
    @Body("author") author: string,
    @Body("publishYear") publishYear: number,
  ) {
    this.bookService.editBook(bookID, name, author, publishYear);
    return null;
  }

  @Delete(":id")
  deleteBook(@Param("id") bookID: string) {
    return this.bookService.removeBook(bookID);
  }
}

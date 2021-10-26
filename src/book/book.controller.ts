import { Body, Controller, Get, Post, Param } from "@nestjs/common";
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
    return this.bookService.fetchSingleProduct(bookID);
  }
}

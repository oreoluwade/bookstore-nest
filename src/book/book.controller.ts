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
  async createBook(
    @Body("name") name: string,
    @Body("author") author: string,
    @Body("publishYear") publishYear: number,
  ) {
    const generatedId = await this.bookService.insertBook(
      name,
      author,
      publishYear,
    );
    return { id: generatedId };
  }

  @Get()
  async getBooks() {
    const booksArray = await this.bookService.fetchAllBooks();
    return booksArray;
  }

  @Get(":id")
  getOneBook(@Param("id") bookID: string) {
    return this.bookService.fetchSingleBook(bookID);
  }

  @Patch(":id")
  async updateBook(
    @Param("id") bookID: string,
    @Body("name") name: string,
    @Body("author") author: string,
    @Body("publishYear") publishYear: number,
  ) {
    await this.bookService.editBook(bookID, name, author, publishYear);
    return null;
  }

  @Delete(":id")
  async deleteBook(@Param("id") bookID: string) {
    await this.bookService.removeBook(bookID);
    return null;
  }
}

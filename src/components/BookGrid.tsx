
import React from 'react';
import { Book } from '@/types/book';
import BookCard from './BookCard';

interface BookGridProps {
  books: Book[];
  title?: string;
}

const BookGrid: React.FC<BookGridProps> = ({ books, title }) => {
  return (
    <div className="my-8">
      {title && (
        <h2 className="text-2xl font-serif font-bold mb-6 decorated-title">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BookGrid;

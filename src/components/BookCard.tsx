
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '@/types/book';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Star, ShoppingCart } from 'lucide-react';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col h-full border rounded-lg overflow-hidden bg-white transition-all duration-300 hover:shadow-lg">
      <Link to={`/book/${book.id}`} className="group">
        <div className="h-64 overflow-hidden">
          <img
            src={book.coverImage}
            alt={book.title}
            className="w-full h-full object-cover book-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>
      <div className="flex flex-col flex-grow p-4">
        <div className="flex items-center mb-2">
          <span className="inline-flex items-center text-yellow-500 mr-1">
            <Star className="h-4 w-4 fill-current" />
          </span>
          <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
          <span className="text-xs text-gray-500 ml-1">({Math.floor(Math.random() * 500) + 50})</span>
        </div>
        
        <Link to={`/book/${book.id}`} className="group">
          <h3 className="font-serif font-semibold mb-1 group-hover:text-bookstore-burgundy transition-colors">
            {book.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2">{book.author}</p>
        
        <div className="mt-auto flex items-baseline">
          <span className="text-lg font-bold">${book.price.toFixed(2)}</span>
          {book.originalPrice && (
            <span className="ml-2 text-sm text-gray-500 line-through">
              ${book.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        
        <div className="mt-3">
          <Button 
            onClick={() => addToCart(book)} 
            className="w-full bg-bookstore-burgundy hover:bg-bookstore-brown"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Thêm vào giỏ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;

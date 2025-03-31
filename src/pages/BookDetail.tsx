
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { getBookById, getRecommendedBooks } from '@/data/books';
import BookGrid from '@/components/BookGrid';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Star, ShoppingCart, BookOpen, Share2, Heart } from 'lucide-react';

const BookDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  
  const book = getBookById(Number(id));
  const recommendedBooks = getRecommendedBooks(Number(id), 4);
  
  if (!book) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sách</h1>
            <p className="mb-6">Cuốn sách bạn đang tìm kiếm không tồn tại.</p>
            <Button asChild>
              <Link to="/books">Xem tất cả sách</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Book Cover */}
            <div className="lg:w-1/3">
              <div className="sticky top-24">
                <div className="bg-white p-4 rounded-lg shadow-md">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-full h-auto object-cover rounded book-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Book Details */}
            <div className="lg:w-2/3">
              <div className="mb-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  <Link to={`/category/${book.category}`}>
                    <span className="inline-block bg-secondary text-sm px-3 py-1 rounded-full">
                      {book.category.charAt(0).toUpperCase() + book.category.slice(1)}
                    </span>
                  </Link>
                  {book.tags.map((tag) => (
                    <Link to={`/tag/${tag}`} key={tag}>
                      <span className="inline-block bg-secondary bg-opacity-50 text-sm px-3 py-1 rounded-full">
                        {tag.charAt(0).toUpperCase() + tag.slice(1)}
                      </span>
                    </Link>
                  ))}
                </div>
                
                <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">{book.title}</h1>
                <p className="text-lg mb-4">bởi <Link to={`/author/${book.author}`} className="hover:text-bookstore-burgundy transition-colors">{book.author}</Link></p>
                
                <div className="flex items-center mb-6">
                  <div className="flex mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(book.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <span className="text-sm text-gray-600">{Math.floor(Math.random() * 500) + 50} đánh giá</span>
                </div>
                
                <div className="flex items-baseline mb-6">
                  <span className="text-3xl font-bold">${book.price.toFixed(2)}</span>
                  {book.originalPrice && (
                    <span className="ml-2 text-lg text-gray-500 line-through">
                      ${book.originalPrice.toFixed(2)}
                    </span>
                  )}
                  {book.originalPrice && (
                    <span className="ml-2 bg-green-100 text-green-800 text-sm px-2 py-0.5 rounded">
                      Tiết kiệm ${(book.originalPrice - book.price).toFixed(2)}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Button 
                    onClick={() => addToCart(book)}
                    size="lg"
                    className="bg-bookstore-burgundy hover:bg-bookstore-brown"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    Thêm vào giỏ hàng
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-bookstore-burgundy text-bookstore-burgundy"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    Thêm vào danh sách yêu thích
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hidden sm:flex"
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="prose max-w-none mb-8">
                  <h2 className="text-xl font-semibold mb-4">Mô tả</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {book.description}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-secondary p-4 rounded">
                    <span className="text-sm text-gray-600">Số trang</span>
                    <p className="font-semibold">{book.pages}</p>
                  </div>
                  <div className="bg-secondary p-4 rounded">
                    <span className="text-sm text-gray-600">Nhà xuất bản</span>
                    <p className="font-semibold">{book.publisher}</p>
                  </div>
                  <div className="bg-secondary p-4 rounded">
                    <span className="text-sm text-gray-600">Ngày xuất bản</span>
                    <p className="font-semibold">{book.publishedDate}</p>
                  </div>
                  <div className="bg-secondary p-4 rounded">
                    <span className="text-sm text-gray-600">Ngôn ngữ</span>
                    <p className="font-semibold">{book.language}</p>
                  </div>
                  <div className="bg-secondary p-4 rounded">
                    <span className="text-sm text-gray-600">ISBN</span>
                    <p className="font-semibold">{book.isbn}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Recommended Books */}
          {recommendedBooks.length > 0 && (
            <div className="mt-16">
              <BookGrid 
                books={recommendedBooks} 
                title={`Sách ${book.category.charAt(0).toUpperCase() + book.category.slice(1)} đề xuất`} 
              />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookDetail;

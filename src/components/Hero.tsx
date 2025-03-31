
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book } from '@/types/book';

interface HeroProps {
  featuredBook: Book;
}

const Hero: React.FC<HeroProps> = ({ featuredBook }) => {
  return (
    <div className="relative bg-bookstore-paper py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-5"></div>
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <span className="inline-block bg-bookstore-burgundy text-white px-3 py-1 text-sm rounded-full mb-4">
              Sách nổi bật
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">{featuredBook.title}</h1>
            <p className="text-lg mb-2">Tác giả: {featuredBook.author}</p>
            <div className="flex items-center mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(featuredBook.rating)
                        ? 'text-yellow-500 fill-current'
                        : 'text-gray-300 fill-current'
                    }`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-sm">
                {featuredBook.rating.toFixed(1)} ({Math.floor(Math.random() * 1000) + 100} đánh giá)
              </span>
            </div>
            <p className="text-gray-600 mb-6 line-clamp-4">
              {featuredBook.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-bookstore-burgundy hover:bg-bookstore-brown">
                <Link to={`/book/${featuredBook.id}`}>
                  Xem chi tiết
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-bookstore-burgundy text-bookstore-burgundy hover:bg-bookstore-burgundy hover:text-white"
                onClick={() => window.location.href = '/books'}
              >
                Xem tất cả sách
              </Button>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-r from-bookstore-burgundy to-bookstore-gold blur-sm opacity-75"></div>
              <img
                src={featuredBook.coverImage}
                alt={featuredBook.title}
                className="relative w-64 h-80 sm:w-72 sm:h-96 object-cover rounded shadow-2xl transform -rotate-3 book-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-white rounded-full shadow-lg px-4 py-2 font-bold text-bookstore-burgundy border border-bookstore-burgundy">
                ${featuredBook.price.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

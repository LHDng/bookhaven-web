
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, TrendingUp, Users, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import BookGrid from '@/components/BookGrid';
import { getFeaturedBooks, books } from '@/data/books';

const Index = () => {
  const featuredBooks = getFeaturedBooks();
  const newArrivals = [...books].sort(() => 0.5 - Math.random()).slice(0, 4);
  const bestSellers = [...books].sort((a, b) => b.rating - a.rating).slice(0, 4);
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero featuredBook={featuredBooks[0]} />
        
        {/* Categories Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-serif font-bold mb-8 decorated-title">Thể loại phổ biến</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: 'Tiểu thuyết', icon: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop', path: '/category/fiction' },
                { name: 'Phi hư cấu', icon: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=712&auto=format&fit=crop', path: '/category/non-fiction' },
                { name: 'Khoa học', icon: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop', path: '/category/science' },
                { name: 'Lịch sử', icon: 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=1374&auto=format&fit=crop', path: '/category/history' },
                { name: 'Kỳ ảo', icon: 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=726&auto=format&fit=crop', path: '/category/fantasy' },
                { name: 'Phát triển bản thân', icon: 'https://images.unsplash.com/photo-1603162525937-97a822dfe6e9?q=80&w=687&auto=format&fit=crop', path: '/category/self-help' },
              ].map(category => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="flex flex-col items-center p-4 rounded-lg border hover:shadow-md transition-shadow"
                >
                  <div className="w-16 h-16 mb-3 rounded-full overflow-hidden">
                    <img 
                      src={category.icon} 
                      alt={category.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="font-medium">{category.name}</span>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <Button asChild variant="outline" className="border-bookstore-burgundy text-bookstore-burgundy">
                <Link to="/books" className="inline-flex items-center">
                  Xem tất cả thể loại
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Featured Books Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <BookGrid books={featuredBooks} title="Sách nổi bật" />
            
            <div className="text-center mt-8">
              <Button asChild className="bg-bookstore-burgundy hover:bg-bookstore-brown">
                <Link to="/books" className="inline-flex items-center">
                  Xem tất cả sách
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* New Arrivals Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <BookGrid books={newArrivals} title="Sách mới" />
          </div>
        </section>
        
        {/* Bestsellers Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <BookGrid books={bestSellers} title="Sách bán chạy" />
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-serif font-bold mb-4">Tại sao chọn ThưViện?</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Chúng tôi cam kết mang đến trải nghiệm mua sách tốt nhất với dịch vụ chất lượng và giá cả cạnh tranh.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center p-6">
                <div className="bg-bookstore-burgundy bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="h-8 w-8 text-bookstore-burgundy" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Đa dạng sách</h3>
                <p className="text-gray-600">
                  Hàng ngàn đầu sách thuộc nhiều thể loại khác nhau để lựa chọn.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-bookstore-burgundy bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-bookstore-burgundy" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Đảm bảo chất lượng</h3>
                <p className="text-gray-600">
                  Tất cả sách đều được kiểm tra kỹ lưỡng trước khi giao hàng.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-bookstore-burgundy bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Truck className="h-8 w-8 text-bookstore-burgundy" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Giao hàng nhanh</h3>
                <p className="text-gray-600">
                  Vận chuyển nhanh chóng để sách đến tay bạn trong thời gian sớm nhất.
                </p>
              </div>
              
              <div className="text-center p-6">
                <div className="bg-bookstore-burgundy bg-opacity-10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-bookstore-burgundy" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Hỗ trợ tận tâm</h3>
                <p className="text-gray-600">
                  Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ bạn với mọi câu hỏi hoặc thắc mắc.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

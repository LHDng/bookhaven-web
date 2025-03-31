
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { ShoppingCart, Menu, X, Search, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

const NavBar = () => {
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    { name: 'Tiểu thuyết', path: '/category/fiction' },
    { name: 'Phi hư cấu', path: '/category/non-fiction' },
    { name: 'Khoa học', path: '/category/science' },
    { name: 'Lịch sử', path: '/category/history' },
    { name: 'Tiểu sử', path: '/category/biography' },
  ];

  return (
    <header className="border-b sticky top-0 bg-background z-30">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BookOpen className="h-8 w-8 text-bookstore-burgundy" />
              <span className="ml-2 text-2xl font-serif font-bold">ThưViện</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="text-sm font-medium hover:text-bookstore-burgundy transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex relative">
              <input
                type="text"
                placeholder="Tìm sách..."
                className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bookstore-burgundy focus:border-transparent"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cart.items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-bookstore-burgundy text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cart.items.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    <h2 className="text-xl font-semibold">Giỏ hàng của bạn</h2>
                    <p className="text-sm text-muted-foreground">
                      {cart.items.length === 0
                        ? "Giỏ hàng đang trống"
                        : `${cart.items.reduce((acc, item) => acc + item.quantity, 0)} sản phẩm trong giỏ hàng`}
                    </p>
                  </div>
                  
                  <div className="flex-grow overflow-auto">
                    {cart.items.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center p-4">
                        <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                        <p className="mb-4">Giỏ hàng của bạn đang trống</p>
                        <Button asChild>
                          <Link to="/books">Xem sách</Link>
                        </Button>
                      </div>
                    ) : (
                      <ul className="space-y-4">
                        {cart.items.map((item) => (
                          <li key={item.book.id} className="flex items-start py-4 border-b">
                            <img
                              src={item.book.coverImage}
                              alt={item.book.title}
                              className="w-16 h-24 object-cover rounded"
                            />
                            <div className="ml-4 flex-1">
                              <h3 className="font-medium">{item.book.title}</h3>
                              <p className="text-sm text-muted-foreground">{item.book.author}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="font-semibold">${item.book.price.toFixed(2)}</span>
                                <div className="flex items-center">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => useCart().updateQuantity(item.book.id, item.quantity - 1)}
                                  >
                                    -
                                  </Button>
                                  <span className="mx-2">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => useCart().updateQuantity(item.book.id, item.quantity + 1)}
                                  >
                                    +
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  
                  {cart.items.length > 0 && (
                    <div className="pt-4 border-t">
                      <div className="flex justify-between mb-4">
                        <span>Tổng tiền</span>
                        <span className="font-semibold">${cart.total.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" asChild>
                        <Link to="/checkout">Thanh toán</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t mt-3">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm sách..."
                  className="w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-bookstore-burgundy focus:border-transparent"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    className="block px-2 py-1 text-sm font-medium hover:text-bookstore-burgundy transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;

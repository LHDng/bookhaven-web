
import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import { User, LogOut, ShoppingBag, Heart } from 'lucide-react';

const MyAccount = () => {
  const { user, isLoggedIn, logout } = useUser();
  const { cart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Nếu chưa đăng nhập, chuyển hướng đến trang đăng nhập
  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  const handleLogout = () => {
    logout();
    toast({
      title: 'Đăng xuất thành công',
      description: 'Hẹn gặp lại bạn!',
    });
    navigate('/');
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 pt-10 pb-20">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="bg-bookstore-burgundy text-white p-6">
              <h1 className="text-2xl font-bold">Tài khoản của tôi</h1>
              <p className="mt-2">Xin chào, {user?.name || 'Khách hàng'}!</p>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Thông tin cá nhân */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <User className="h-6 w-6 text-bookstore-burgundy mr-2" />
                    <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
                  </div>
                  <div className="space-y-3">
                    <p><span className="font-medium">Họ tên:</span> {user?.name}</p>
                    <p><span className="font-medium">Email:</span> {user?.email}</p>
                    {user?.isAdmin && (
                      <p className="text-bookstore-burgundy font-medium">
                        Tài khoản quản trị viên
                      </p>
                    )}
                  </div>
                  <div className="mt-6">
                    <Button
                      onClick={handleLogout}
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <LogOut className="h-4 w-4" />
                      Đăng xuất
                    </Button>
                  </div>
                </div>
                
                {/* Đơn hàng */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <ShoppingBag className="h-6 w-6 text-bookstore-burgundy mr-2" />
                    <h2 className="text-xl font-semibold">Đơn hàng của tôi</h2>
                  </div>
                  <p className="text-gray-600 mb-4">
                    Xem trạng thái và lịch sử đơn hàng của bạn
                  </p>
                  <div className="bg-white p-4 rounded border border-gray-200 mb-4">
                    <p className="text-center text-gray-500">Bạn chưa có đơn hàng nào</p>
                  </div>
                  <Button
                    onClick={() => navigate('/books')}
                    className="w-full bg-bookstore-burgundy hover:bg-bookstore-burgundy/90"
                  >
                    Mua sắm ngay
                  </Button>
                </div>
                
                {/* Giỏ hàng */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                  <div className="flex items-center mb-4">
                    <Heart className="h-6 w-6 text-bookstore-burgundy mr-2" />
                    <h2 className="text-xl font-semibold">Giỏ hàng của tôi</h2>
                  </div>
                  {cart.items.length > 0 ? (
                    <>
                      <p className="text-gray-600 mb-4">
                        Bạn có {cart.items.length} sản phẩm trong giỏ hàng
                      </p>
                      <ul className="divide-y divide-gray-200 mb-4">
                        {cart.items.slice(0, 3).map(item => (
                          <li key={item.book.id} className="py-2">
                            <div className="flex justify-between">
                              <span className="truncate">{item.book.title}</span>
                              <span className="font-medium">{item.quantity}x</span>
                            </div>
                          </li>
                        ))}
                        {cart.items.length > 3 && (
                          <li className="py-2 text-center text-sm text-gray-500">
                            ...và {cart.items.length - 3} sản phẩm khác
                          </li>
                        )}
                      </ul>
                      <Button
                        onClick={() => navigate('/checkout')}
                        className="w-full bg-bookstore-burgundy hover:bg-bookstore-burgundy/90"
                      >
                        Thanh toán (${cart.total.toFixed(2)})
                      </Button>
                    </>
                  ) : (
                    <>
                      <p className="text-gray-600 mb-4">
                        Giỏ hàng của bạn đang trống
                      </p>
                      <div className="bg-white p-4 rounded border border-gray-200 mb-4">
                        <p className="text-center text-gray-500">Chưa có sản phẩm nào</p>
                      </div>
                      <Button
                        onClick={() => navigate('/books')}
                        variant="outline"
                        className="w-full"
                      >
                        Khám phá sách
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyAccount;

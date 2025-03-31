
import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const orderNumber = Math.floor(100000 + Math.random() * 900000); // Tạo số đơn hàng ngẫu nhiên
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50 flex items-center justify-center">
        <div className="max-w-2xl w-full mx-auto px-4 py-12">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="mb-6 flex justify-center">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            
            <h1 className="text-3xl font-bold mb-2">Cảm ơn bạn đã đặt hàng!</h1>
            <p className="text-gray-600 mb-8">
              Đơn hàng của bạn đã được đặt thành công và đang được xử lý.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
              <div className="flex justify-between mb-4">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-semibold">#{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ngày đặt hàng:</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
            </div>
            
            <p className="mb-2">
              Chúng tôi đã gửi email xác nhận với thông tin chi tiết đơn hàng và thông tin theo dõi.
            </p>
            <p className="text-gray-600 mb-8">
              Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với bộ phận hỗ trợ khách hàng của chúng tôi.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
              <Button asChild className="bg-bookstore-burgundy hover:bg-bookstore-brown">
                <Link to="/">Tiếp tục mua sắm</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/my-account">Xem đơn hàng của tôi</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderConfirmation;

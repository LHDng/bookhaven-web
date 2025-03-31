
import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useNavigate } from 'react-router-dom';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from '@/components/ui/use-toast';
import { CreditCard, Truck, Check } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(1);
  
  const shipping = 4.99;
  const tax = cart.total * 0.1;
  const orderTotal = cart.total + shipping + tax;
  
  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you would process the order here
    toast({
      title: "Order placed successfully!",
      description: "Thank you for your purchase.",
      duration: 5000,
    });
    
    clearCart();
    navigate('/order-confirmation');
  };
  
  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6">Add some books to your cart before proceeding to checkout.</p>
            <Button
              onClick={() => navigate('/books')}
              className="bg-bookstore-burgundy hover:bg-bookstore-brown"
            >
              Browse Books
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-bold mb-6 decorated-title">Checkout</h1>
          
          {/* Checkout Steps */}
          <div className="mb-8">
            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
              <li className={`flex md:w-full items-center ${activeStep >= 1 ? 'text-bookstore-burgundy dark:text-bookstore-burgundy' : ''}`}>
                <span className={`flex items-center justify-center w-8 h-8 mr-2 ${activeStep >= 1 ? 'bg-bookstore-burgundy text-white' : 'bg-gray-200'} rounded-full shrink-0`}>
                  1
                </span>
                <span className="hidden sm:inline-flex">Cart</span>
                <svg className="w-3 h-3 ml-2 sm:ml-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                </svg>
              </li>
              <li className={`flex md:w-full items-center ${activeStep >= 2 ? 'text-bookstore-burgundy dark:text-bookstore-burgundy' : ''}`}>
                <span className={`flex items-center justify-center w-8 h-8 mr-2 ${activeStep >= 2 ? 'bg-bookstore-burgundy text-white' : 'bg-gray-200'} rounded-full shrink-0`}>
                  2
                </span>
                <span className="hidden sm:inline-flex">Shipping</span>
                <svg className="w-3 h-3 ml-2 sm:ml-4 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m7 9 4-4-4-4M1 9l4-4-4-4"/>
                </svg>
              </li>
              <li className={`flex items-center ${activeStep >= 3 ? 'text-bookstore-burgundy dark:text-bookstore-burgundy' : ''}`}>
                <span className={`flex items-center justify-center w-8 h-8 mr-2 ${activeStep >= 3 ? 'bg-bookstore-burgundy text-white' : 'bg-gray-200'} rounded-full shrink-0`}>
                  3
                </span>
                <span className="hidden sm:inline-flex">Payment</span>
              </li>
            </ol>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Order Summary */}
            <div className="lg:w-1/3 order-2 lg:order-1">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="divide-y">
                  {cart.items.map((item) => (
                    <div key={item.book.id} className="flex py-4">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.title}
                        className="w-16 h-24 object-cover rounded"
                      />
                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.book.title}</h3>
                        <p className="text-sm text-gray-600">by {item.book.author}</p>
                        <div className="flex justify-between mt-2">
                          <span className="text-sm">${item.book.price.toFixed(2)} × {item.quantity}</span>
                          <span className="font-medium">${(item.book.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${cart.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-4">
                    <span>Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Checkout Form */}
            <div className="lg:w-2/3 order-1 lg:order-2">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <form onSubmit={handleSubmitOrder}>
                  {activeStep === 1 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <Truck className="mr-2 h-5 w-5" />
                        Shipping Information
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input id="firstName" required />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input id="lastName" required />
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" type="email" required />
                      </div>
                      
                      <div className="mb-4">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" />
                      </div>
                      
                      <div className="mb-4">
                        <Label htmlFor="address">Address</Label>
                        <Input id="address" required />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                          <Label htmlFor="city">City</Label>
                          <Input id="city" required />
                        </div>
                        <div>
                          <Label htmlFor="state">State/Province</Label>
                          <Select defaultValue="CA">
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                          <Input id="zipCode" required />
                        </div>
                      </div>
                      
                      <Button
                        type="button"
                        onClick={() => setActiveStep(2)}
                        className="w-full bg-bookstore-burgundy hover:bg-bookstore-brown"
                      >
                        Continue to Payment
                      </Button>
                    </div>
                  )}
                  
                  {activeStep === 2 && (
                    <div>
                      <h2 className="text-xl font-semibold mb-6 flex items-center">
                        <CreditCard className="mr-2 h-5 w-5" />
                        Payment Method
                      </h2>
                      
                      <div className="mb-6">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" required />
                      </div>
                      
                      <div className="mb-6">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" required />
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <Label htmlFor="expDate">Expiration Date</Label>
                          <Input id="expDate" placeholder="MM/YY" required />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" required />
                        </div>
                      </div>
                      
                      <div className="flex space-x-4">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveStep(1)}
                        >
                          Back
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1 bg-bookstore-burgundy hover:bg-bookstore-brown"
                        >
                          Place Order
                        </Button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Checkout;

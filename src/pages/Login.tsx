
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

const formSchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' }),
});

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUser();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      console.log("Submitting login form with:", values.email);
      const success = await login(values.email, values.password);
      if (success) {
        toast({
          title: 'Đăng nhập thành công',
          description: 'Chào mừng bạn quay trở lại!',
        });
        navigate('/');
      } else {
        toast({
          title: 'Đăng nhập thất bại',
          description: 'Email hoặc mật khẩu không chính xác',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error("Caught error during login:", error);
      toast({
        title: 'Lỗi',
        description: 'Đã xảy ra lỗi khi đăng nhập',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <div className="container max-w-md mx-auto flex-1 flex flex-col items-center justify-center px-4 py-12">
          <div className="w-full bg-white px-6 py-8 rounded-lg shadow-md">
            <h1 className="mb-8 text-2xl font-bold text-center">Đăng nhập</h1>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="Email của bạn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Mật khẩu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-bookstore-burgundy hover:bg-bookstore-burgundy/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
                </Button>
              </form>
            </Form>
            
            <div className="text-center mt-6">
              <p className="text-sm text-gray-600">
                Chưa có tài khoản?{' '}
                <Link to="/register" className="text-bookstore-burgundy hover:underline">
                  Đăng ký
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;

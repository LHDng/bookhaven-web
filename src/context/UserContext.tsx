
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from '@/components/ui/use-toast';

// Định nghĩa kiểu dữ liệu cho người dùng
export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin?: boolean;
}

interface UserContextType {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Kiểm tra xem người dùng đã đăng nhập không và cập nhật phiên
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        if (session?.user) {
          const supaUser = session.user;
          
          // Lấy thông tin người dùng từ bảng profiles (nếu có)
          const { data, error } = await supabase
            .from('profiles')
            .select('name, is_admin')
            .eq('id', supaUser.id)
            .single();
          
          if (error) {
            console.error('Lỗi khi lấy profile:', error);
          }
            
          const userWithName: User = {
            id: supaUser.id,
            email: supaUser.email || '',
            name: data?.name || supaUser.email?.split('@')[0] || 'Người dùng',
            isAdmin: data?.is_admin || false
          };
          
          setUser(userWithName);
          setIsLoggedIn(true);
        } else {
          setUser(null);
          setIsLoggedIn(false);
        }
      }
    );

    // Kiểm tra phiên hiện tại khi tải trang
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      console.log("Current session check:", session?.user?.id);
      if (error) {
        console.error('Lỗi khi lấy session:', error);
        return;
      }
      
      if (session?.user) {
        const supaUser = session.user;
        
        // Lấy thông tin người dùng từ bảng profiles (nếu có)
        supabase
          .from('profiles')
          .select('name, is_admin')
          .eq('id', supaUser.id)
          .single()
          .then(({ data, error }) => {
            if (error) {
              console.error('Lỗi khi lấy profile:', error);
              return;
            }
            
            const userWithName: User = {
              id: supaUser.id,
              email: supaUser.email || '',
              name: data?.name || supaUser.email?.split('@')[0] || 'Người dùng',
              isAdmin: data?.is_admin || false
            };
            
            setUser(userWithName);
            setIsLoggedIn(true);
          });
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // Hàm đăng nhập
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error("Login error:", error.message);
        toast({
          title: "Đăng nhập thất bại",
          description: error.message,
          variant: "destructive"
        });
        return false;
      }

      if (data.user) {
        console.log("Login successful for:", data.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
      return false;
    }
  };

  // Hàm đăng ký
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting registration for:", email, name);
      
      // Đăng ký người dùng mới trong Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (authError) {
        console.error("Registration error:", authError.message);
        toast({
          title: "Đăng ký thất bại",
          description: authError.message,
          variant: "destructive"
        });
        return false;
      }

      if (authData.user) {
        console.log("Registration successful for:", authData.user.id);
        
        // Thêm thông tin người dùng vào bảng profiles
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            name,
            email,
            is_admin: false
          });

        if (profileError) {
          console.error('Lỗi tạo hồ sơ:', profileError);
          // Không return false ở đây vì người dùng đã được tạo
        }
        
        if (authData.session) {
          // Nếu có session, có nghĩa là xác thực email đã được chuyển sang chế độ tự động
          toast({
            title: "Đăng ký thành công",
            description: "Chào mừng bạn đến với ThưViện!"
          });
        } else {
          // Nếu không có session, người dùng cần xác thực email
          toast({
            title: "Đăng ký thành công",
            description: "Vui lòng kiểm tra email của bạn để xác thực tài khoản."
          });
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Đã đăng xuất",
      description: "Hẹn gặp lại bạn!"
    });
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook để sử dụng context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser phải được sử dụng trong UserProvider');
  }
  return context;
};

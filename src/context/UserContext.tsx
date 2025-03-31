
import React, { createContext, useContext, useState, useEffect } from 'react';

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

  // Kiểm tra xem người dùng đã đăng nhập trước đó chưa (từ localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  // Hàm đăng nhập
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Trong thực tế, đây sẽ là một API call để xác thực người dùng
      // Hiện tại, chỉ mô phỏng với một số người dùng cố định
      
      // Mô phỏng người dùng (trong thực tế sẽ từ API)
      const mockUsers = [
        { id: '1', email: 'admin@thuvien.com', name: 'Admin', password: 'admin123', isAdmin: true },
        { id: '2', email: 'user@thuvien.com', name: 'Người dùng', password: 'user123' }
      ];
      
      const foundUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Loại bỏ password trước khi lưu thông tin người dùng
        const { password, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        setIsLoggedIn(true);
        
        // Lưu thông tin người dùng vào localStorage
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
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
      // Trong thực tế, đây sẽ là một API call để đăng ký người dùng mới
      // Hiện tại, chỉ mô phỏng việc đăng ký thành công
      
      // Kiểm tra xem email đã tồn tại chưa
      const existingUser = localStorage.getItem('registeredUsers');
      let users = existingUser ? JSON.parse(existingUser) : [];
      
      if (users.some((u: any) => u.email === email)) {
        return false; // Email đã tồn tại
      }
      
      // Tạo người dùng mới
      const newUser = {
        id: Date.now().toString(),
        name,
        email
      };
      
      // Lưu thông tin người dùng mới
      users.push({ ...newUser, password });
      localStorage.setItem('registeredUsers', JSON.stringify(users));
      
      // Đăng nhập người dùng mới
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('user', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      return false;
    }
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('user');
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

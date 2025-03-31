
-- Tạo bảng profiles để lưu thông tin người dùng mở rộng
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  name TEXT,
  email TEXT UNIQUE,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Kích hoạt Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Tạo các policy để bảo vệ dữ liệu
CREATE POLICY "Người dùng có thể xem hồ sơ của mình" 
  ON public.profiles 
  FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Người dùng có thể cập nhật hồ sơ của mình" 
  ON public.profiles 
  FOR UPDATE 
  USING (auth.uid() = id);

-- Tạo bảng cho sách
CREATE TABLE IF NOT EXISTS public.books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  cover_image TEXT NOT NULL,
  rating DECIMAL(3, 1) NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  description TEXT NOT NULL,
  pages INTEGER NOT NULL,
  publisher TEXT NOT NULL,
  published_date TEXT NOT NULL,
  language TEXT NOT NULL,
  isbn TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Kích hoạt Row Level Security (RLS)
ALTER TABLE public.books ENABLE ROW LEVEL SECURITY;

-- Policy để ai cũng có thể xem sách
CREATE POLICY "Sách có thể xem công khai" 
  ON public.books 
  FOR SELECT 
  TO PUBLIC;

-- Policy để chỉ admin mới có thể sửa sách
CREATE POLICY "Chỉ admin mới có thể thêm/sửa/xóa sách" 
  ON public.books 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );

-- Tạo bảng thể loại
CREATE TABLE IF NOT EXISTS public.categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  icon TEXT NOT NULL
);

-- Kích hoạt Row Level Security (RLS)
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Policy để ai cũng có thể xem thể loại
CREATE POLICY "Thể loại có thể xem công khai" 
  ON public.categories 
  FOR SELECT 
  TO PUBLIC;

-- Policy để chỉ admin mới có thể sửa thể loại
CREATE POLICY "Chỉ admin mới có thể thêm/sửa/xóa thể loại" 
  ON public.categories 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );

-- Tạo bảng đơn hàng
CREATE TABLE IF NOT EXISTS public.orders (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  status TEXT NOT NULL,
  total DECIMAL(10, 2) NOT NULL,
  shipping_address JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Kích hoạt Row Level Security (RLS)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy để người dùng chỉ có thể xem đơn hàng của mình
CREATE POLICY "Người dùng chỉ có thể xem đơn hàng của mình" 
  ON public.orders 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Policy để người dùng chỉ có thể tạo đơn hàng cho chính mình
CREATE POLICY "Người dùng chỉ có thể tạo đơn hàng cho chính mình" 
  ON public.orders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Policy để admin có thể xem và cập nhật tất cả đơn hàng
CREATE POLICY "Admin có thể xem và cập nhật tất cả đơn hàng" 
  ON public.orders 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );

-- Tạo bảng chi tiết đơn hàng
CREATE TABLE IF NOT EXISTS public.order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES public.orders NOT NULL,
  book_id INTEGER REFERENCES public.books NOT NULL,
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- Kích hoạt Row Level Security (RLS)
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Policy để người dùng chỉ có thể xem chi tiết đơn hàng của mình
CREATE POLICY "Người dùng chỉ có thể xem chi tiết đơn hàng của mình" 
  ON public.order_items 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Policy để người dùng chỉ có thể tạo chi tiết đơn hàng cho đơn hàng của mình
CREATE POLICY "Người dùng chỉ có thể tạo chi tiết đơn hàng cho đơn hàng của mình" 
  ON public.order_items 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Policy để admin có thể xem và cập nhật tất cả chi tiết đơn hàng
CREATE POLICY "Admin có thể xem và cập nhật tất cả chi tiết đơn hàng" 
  ON public.order_items 
  FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.is_admin = TRUE
    )
  );

-- Dữ liệu mẫu cho thể loại
INSERT INTO public.categories (id, name, icon) VALUES
('fiction', 'Tiểu thuyết', 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop'),
('non-fiction', 'Phi hư cấu', 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=712&auto=format&fit=crop'),
('science', 'Khoa học', 'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop'),
('history', 'Lịch sử', 'https://images.unsplash.com/photo-1461360228754-6e81c478b882?q=80&w=1374&auto=format&fit=crop'),
('fantasy', 'Kỳ ảo', 'https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=726&auto=format&fit=crop'),
('self-help', 'Phát triển bản thân', 'https://images.unsplash.com/photo-1603162525937-97a822dfe6e9?q=80&w=687&auto=format&fit=crop')
ON CONFLICT (id) DO NOTHING;

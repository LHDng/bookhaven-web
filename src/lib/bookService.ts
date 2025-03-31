
import { supabase } from '@/integrations/supabase/client';
import { Book, BookCategory } from '@/types/book';

export async function getAllBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select('*');
    
  if (error) {
    console.error('Lỗi khi lấy sách:', error);
    return [];
  }
  
  return data.map(mapDatabaseBookToBook);
}

export async function getBookById(id: number): Promise<Book | undefined> {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    console.error(`Lỗi khi lấy sách id=${id}:`, error);
    return undefined;
  }
  
  return mapDatabaseBookToBook(data);
}

export async function getBooksByCategory(category: string): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('category', category);
    
  if (error) {
    console.error(`Lỗi khi lấy sách theo thể loại ${category}:`, error);
    return [];
  }
  
  return data.map(mapDatabaseBookToBook);
}

export async function getFeaturedBooks(): Promise<Book[]> {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('featured', true);
    
  if (error) {
    console.error('Lỗi khi lấy sách nổi bật:', error);
    return [];
  }
  
  return data.map(mapDatabaseBookToBook);
}

export async function getRecommendedBooks(currentBookId: number, limit: number = 4): Promise<Book[]> {
  // Lấy sách hiện tại để biết thể loại
  const currentBook = await getBookById(currentBookId);
  if (!currentBook) return [];
  
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('category', currentBook.category)
    .neq('id', currentBookId)
    .limit(limit);
    
  if (error) {
    console.error('Lỗi khi lấy sách đề xuất:', error);
    return [];
  }
  
  return data.map(mapDatabaseBookToBook);
}

export async function getCategories(): Promise<{id: string, name: string, icon: string}[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*');
    
  if (error) {
    console.error('Lỗi khi lấy thể loại:', error);
    return [];
  }
  
  return data;
}

function mapDatabaseBookToBook(dbBook: any): Book {
  return {
    id: dbBook.id,
    title: dbBook.title,
    author: dbBook.author,
    price: dbBook.price,
    originalPrice: dbBook.original_price,
    coverImage: dbBook.cover_image,
    rating: dbBook.rating,
    category: dbBook.category as BookCategory,
    tags: dbBook.tags,
    description: dbBook.description,
    pages: dbBook.pages,
    publisher: dbBook.publisher,
    publishedDate: dbBook.published_date,
    language: dbBook.language,
    isbn: dbBook.isbn,
    featured: dbBook.featured
  };
}

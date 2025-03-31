
import React, { useState, useEffect } from 'react';
import { books } from '@/data/books';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import BookCard from '@/components/BookCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Book, BookCategory } from '@/types/book';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const BooksPage = () => {
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 50]);
  const [sortOption, setSortOption] = useState('newest');
  
  const categories = [
    { id: 'fiction', name: 'Fiction' },
    { id: 'non-fiction', name: 'Non-Fiction' },
    { id: 'science', name: 'Science' },
    { id: 'history', name: 'History' },
    { id: 'biography', name: 'Biography' },
    { id: 'fantasy', name: 'Fantasy' },
    { id: 'mystery', name: 'Mystery' },
    { id: 'self-help', name: 'Self-Help' },
  ];
  
  useEffect(() => {
    let result = books;
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
      );
    }
    
    // Filter by category
    if (selectedCategory) {
      result = result.filter(book => book.category === selectedCategory);
    }
    
    // Filter by price range
    result = result.filter(book => 
      book.price >= priceRange[0] && book.price <= priceRange[1]
    );
    
    // Sort results
    switch (sortOption) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'title-asc':
        result = [...result].sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'title-desc':
        result = [...result].sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'newest':
      default:
        // Simulating sort by date - in a real app would use actual date objects
        result = [...result].sort((a, b) => b.id - a.id);
        break;
    }
    
    setFilteredBooks(result);
  }, [selectedCategory, searchQuery, priceRange, sortOption]);
  
  const maxPrice = Math.max(...books.map(book => book.price));
  
  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-serif font-bold mb-8 decorated-title">Browse Books</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar - Filters */}
            <div className="lg:w-1/4">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="mb-6">
                  <Label htmlFor="search" className="mb-2 block">Search</Label>
                  <Input
                    id="search"
                    placeholder="Search by title or author"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <CategoryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                
                <div className="mb-6">
                  <h2 className="text-xl font-medium mb-4">Price Range</h2>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, maxPrice]}
                      max={maxPrice}
                      step={1}
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      className="mb-4"
                    />
                    <div className="flex justify-between items-center">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Main Content - Book List */}
            <div className="lg:w-3/4">
              <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                  <p className="mb-4 sm:mb-0">{filteredBooks.length} results</p>
                  <div className="flex items-center">
                    <Label htmlFor="sort" className="mr-2 text-sm whitespace-nowrap">Sort by:</Label>
                    <Select value={sortOption} onValueChange={setSortOption}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort By" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="newest">Newest</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                        <SelectItem value="rating">Rating</SelectItem>
                        <SelectItem value="title-asc">Title: A-Z</SelectItem>
                        <SelectItem value="title-desc">Title: Z-A</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {filteredBooks.length === 0 ? (
                <div className="bg-white p-6 rounded-lg shadow-sm text-center py-12">
                  <h2 className="text-2xl font-medium mb-4">No books found</h2>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your filters or search criteria.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredBooks.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BooksPage;

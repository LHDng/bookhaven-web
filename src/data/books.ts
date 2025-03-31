
import { Book } from "../types/book";

export const books: Book[] = [
  {
    id: 1,
    title: "The Silent Echo",
    author: "Elizabeth Morgan",
    price: 18.99,
    originalPrice: 24.99,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    rating: 4.5,
    category: "fiction",
    tags: ["mystery", "psychological", "bestseller"],
    description: "A haunting tale of silence and secrets in a small coastal town. When Miranda returns to her childhood home after twenty years, she discovers that the echo of past events still reverberates through the community. As she unravels the mystery behind her father's disappearance, she must confront the darkness that lies beneath the town's peaceful facade.",
    pages: 342,
    publisher: "Riverhead Books",
    publishedDate: "2023-05-15",
    language: "English",
    isbn: "978-1234567890",
    featured: true
  },
  {
    id: 2,
    title: "Quantum Horizons",
    author: "Dr. Richard Hayes",
    price: 22.50,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop",
    rating: 4.2,
    category: "science",
    tags: ["physics", "quantum mechanics", "educational"],
    description: "An accessible exploration of quantum physics and its implications for our understanding of reality. Dr. Hayes guides readers through complex concepts with clarity and insight, revealing how quantum mechanics challenges our most basic assumptions about the universe.",
    pages: 418,
    publisher: "Scientific Press",
    publishedDate: "2022-11-10",
    language: "English",
    isbn: "978-0987654321",
    featured: true
  },
  {
    id: 3,
    title: "Whispers of the Ancients",
    author: "Maya Blackwood",
    price: 15.99,
    originalPrice: 19.99,
    coverImage: "https://images.unsplash.com/photo-1603162525937-97a822dfe6e9?q=80&w=687&auto=format&fit=crop",
    rating: 4.7,
    category: "fantasy",
    tags: ["magic", "adventure", "series"],
    description: "In a world where magic is forbidden, a young apprentice discovers an ancient text that could change everything. As she learns to harness her newfound powers, she must navigate political intrigue and ancient prophecies while evading those who would destroy the last vestiges of magic forever.",
    pages: 512,
    publisher: "Mystic Publishing",
    publishedDate: "2023-02-28",
    language: "English",
    isbn: "978-5678901234",
    featured: true
  },
  {
    id: 4,
    title: "The Art of Mindful Living",
    author: "Sarah Chen",
    price: 16.95,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    rating: 4.8,
    category: "self-help",
    tags: ["mindfulness", "meditation", "wellness"],
    description: "A practical guide to incorporating mindfulness into everyday life. Sarah Chen draws on her twenty years of meditation practice and teaching to offer simple yet powerful techniques for reducing stress, increasing focus, and cultivating compassion.",
    pages: 248,
    publisher: "Serenity Press",
    publishedDate: "2022-08-12",
    language: "English",
    isbn: "978-6789012345"
  },
  {
    id: 5,
    title: "Empire of Shadows",
    author: "Jonathan Blake",
    price: 20.99,
    coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=726&auto=format&fit=crop",
    rating: 4.4,
    category: "fantasy",
    tags: ["epic", "war", "politics"],
    description: "The first book in the Shadow Throne trilogy plunges readers into a continent on the brink of war. As five rival empires maneuver for advantage, a forgotten power stirs in the shadows, threatening to upset the delicate balance of power. Multiple perspectives weave together to create a tapestry of intrigue, betrayal, and heroism.",
    pages: 624,
    publisher: "Epic Tales Publishing",
    publishedDate: "2023-01-05",
    language: "English",
    isbn: "978-7890123456"
  },
  {
    id: 6,
    title: "The Hidden History of Rome",
    author: "Dr. Elena Rossi",
    price: 24.99,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=712&auto=format&fit=crop",
    rating: 4.6,
    category: "history",
    tags: ["ancient rome", "archaeology", "academic"],
    description: "A groundbreaking reexamination of Roman history based on recent archaeological discoveries. Dr. Rossi challenges conventional narratives and reveals the untold stories of everyday citizens, marginalized groups, and forgotten emperors that shaped the course of the ancient world's greatest empire.",
    pages: 472,
    publisher: "Academic Historical Press",
    publishedDate: "2022-09-30",
    language: "English",
    isbn: "978-8901234567"
  },
  {
    id: 7,
    title: "Beyond the Code",
    author: "Michael Zhang",
    price: 28.50,
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop",
    rating: 4.3,
    category: "non-fiction",
    tags: ["technology", "ethics", "future"],
    description: "An exploration of how artificial intelligence is reshaping society, ethics, and what it means to be human. Zhang draws on his experience as both a software engineer and philosopher to examine the promises and perils of emerging technologies, offering a nuanced view of our increasingly automated future.",
    pages: 386,
    publisher: "Future Press",
    publishedDate: "2023-03-14",
    language: "English",
    isbn: "978-9012345678"
  },
  {
    id: 8,
    title: "The Night Watchman",
    author: "Louise Williams",
    price: 17.99,
    coverImage: "https://images.unsplash.com/photo-1621351183012-e2f9972dd9bf?q=80&w=726&auto=format&fit=crop",
    rating: 4.9,
    category: "fiction",
    tags: ["historical", "cultural", "award-winning"],
    description: "Based on the extraordinary life of the author's grandfather, this novel follows Thomas, a night watchman at a jewel bearing plant near a Native American reservation in rural North Dakota. As he fights against Congressional efforts to displace his community in the 1950s, his niece's coming-of-age story intertwines with his activism.",
    pages: 464,
    publisher: "Literary House",
    publishedDate: "2022-07-22",
    language: "English",
    isbn: "978-0123456789",
    featured: true
  },
  {
    id: 9,
    title: "The Wilderness Within",
    author: "Daniel Carter",
    price: 19.95,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    rating: 4.1,
    category: "biography",
    tags: ["memoir", "adventure", "self-discovery"],
    description: "After a near-death experience in the Alaskan wilderness, writer Daniel Carter embarks on a year-long journey through the world's most remote places. His memoir explores the thin line between civilization and wildness, and how confronting nature's extremes revealed his own inner landscape.",
    pages: 328,
    publisher: "Exploration Books",
    publishedDate: "2023-04-18",
    language: "English",
    isbn: "978-1357924680"
  },
  {
    id: 10,
    title: "The Quantum Detective",
    author: "Alex Mercer",
    price: 16.50,
    originalPrice: 21.99,
    coverImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=712&auto=format&fit=crop",
    rating: 4.0,
    category: "science-fiction",
    tags: ["mystery", "quantum physics", "noir"],
    description: "In a near-future where quantum computing has revolutionized crime-solving, detective Sam Maxwell relies on technology to solve cases with mathematical precision. But when a series of murders defies quantum prediction algorithms, Maxwell must reconnect with his human intuition to catch a killer who seems to bend the laws of physics.",
    pages: 392,
    publisher: "Speculative Fiction House",
    publishedDate: "2022-10-11",
    language: "English",
    isbn: "978-2468013579"
  },
  {
    id: 11,
    title: "Little Fox in the Forest",
    author: "Emma Wilson",
    price: 14.95,
    coverImage: "https://images.unsplash.com/photo-1603162525937-97a822dfe6e9?q=80&w=687&auto=format&fit=crop",
    rating: 4.7,
    category: "children",
    tags: ["picture book", "adventure", "friendship"],
    description: "A wordless picture book telling the story of a little girl who follows a fox that has taken her beloved stuffed animal into the forest. As she ventures deeper into the woods, she discovers a magical village of animals and learns the true meaning of friendship and sharing.",
    pages: 48,
    publisher: "Children's Wonder",
    publishedDate: "2023-02-05",
    language: "English",
    isbn: "978-3691582470"
  },
  {
    id: 12,
    title: "Recipes from Provence",
    author: "Juliette Dubois",
    price: 32.00,
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    rating: 4.8,
    category: "non-fiction",
    tags: ["cookbook", "french cuisine", "cultural"],
    description: "A stunning collection of traditional recipes from the sun-drenched region of Provence. Chef Juliette Dubois shares family secrets passed down through generations, along with stories of local producers, seasonal ingredients, and the cultural significance of each dish.",
    pages: 284,
    publisher: "Culinary Arts Publishing",
    publishedDate: "2022-06-15",
    language: "English",
    isbn: "978-4825769310"
  }
];

export const getBookById = (id: number): Book | undefined => {
  return books.find(book => book.id === id);
};

export const getBooksByCategory = (category: string): Book[] => {
  return books.filter(book => book.category === category);
};

export const getFeaturedBooks = (): Book[] => {
  return books.filter(book => book.featured);
};

export const getRecommendedBooks = (currentBookId: number, limit: number = 4): Book[] => {
  const currentBook = getBookById(currentBookId);
  if (!currentBook) return [];
  
  return books
    .filter(book => book.id !== currentBookId && book.category === currentBook.category)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

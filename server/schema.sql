DROP TABLE IF EXISTS `books`;
DROP TABLE IF EXISTS `userauth`;
DROP TABLE IF EXISTS `adminauth`;

CREATE TABLE `books` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(40) NOT NULL,
  `author` varchar(40) NOT NULL,
  `genre` varchar(20) NOT NULL,
  `publication_year` int NOT NULL,
  PRIMARY KEY (`id`)
);

CREATE TABLE `userauth` (
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(40) NOT NULL,
    `email` varchar(50) NOT NULL,
    `password` varchar(50) NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE `adminauth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE (`email`)
);

INSERT INTO books (title, author, genre, publication_year) VALUES
    ("The Great Gatsby", "F. Scott Fitzgerald", "Classic", 1925),
    ("To Kill a Mockingbird", "Harper Lee", "Classic", 1960),
    ("1984", "George Orwell", "Dystopian", 1949),
    ("The Hobbit", "J.R.R. Tolkien", "Fantasy", 1937),
    ("Pride and Prejudice", "Jane Austen", "Romance", 1813),
    ("The Catcher in the Rye", "J.D. Salinger", "Coming of Age", 1951),
    ("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", "Fantasy", 1997),
    ("Moby-Dick", "Herman Melville", "Adventure", 1851),
    ("The Lord of the Rings", "J.R.R. Tolkien", "Fantasy", 1954),
    ("The Hunger Games", "Suzanne Collins", "Dystopian", 2008),
    ("Jane Eyre", "Charlotte Brontë", "Gothic", 1847),
    ("The Alchemist", "Paulo Coelho", "Adventure", 1988),
    ("The Da Vinci Code", "Dan Brown", "Thriller", 2003),
    ("The Odyssey", "Homer", "Epic", -800),
    ("The Shining", "Stephen King", "Horror", 1977),
    ("The Road", "Cormac McCarthy", "Post-Apocalyptic", 2006),
    ("Brave New World", "Aldous Huxley", "Dystopian", 1932),
    ("The Girl with the Dragon Tattoo", "Stieg Larsson", "Mystery", 2005),
    ("The Brothers Karamazov", "Fyodor Dostoevsky", "Literary Fiction", 1880),
    ("The Little Prince", "Antoine de Saint-Exupéry", "Children's", 1943),
    ("War and Peace", "Leo Tolstoy", "Historical Fiction", 1869),
    ("The Giver", "Lois Lowry", "Science Fiction", 1993),
    ("The Picture of Dorian Gray", "Oscar Wilde", "Gothic", 1890),
    ("The Road Less Traveled", "M. Scott Peck", "Self-Help", 1978),
    ("The Secret Garden", "Frances Hodgson Burnett", "Children's", 1911),
    ("Siddhartha", "Hermann Hesse", "Spirituality", 1922),
    ("The Martian", "Andy Weir", "Science Fiction", 2011),
    ("The Stand", "Stephen King", "Horror", 1978),
    ("The Old Man and the Sea", "Ernest Hemingway", "Adventure", 1952),
    ("A Tale of Two Cities", "Charles Dickens", "Historical Fiction", 1859),
    ("The Catcher in the Rye", "J.D. Salinger", "Coming of Age", 1951),
    ("The Time Traveler's Wife", "Audrey Niffenegger", "Romance", 2003),
    ("The Handmaid's Tale", "Margaret Atwood", "Dystopian", 1985),
    ("The Catcher in the Rye", "J.D. Salinger", "Coming of Age", 1951),
    ("The Metamorphosis", "Franz Kafka", "Absurdist", 1915),
    ("The Fault in Our Stars", "John Green", "Young Adult", 2012),
    ("Lord of the Flies", "William Golding", "Adventure", 1954),
    ("The Book Thief", "Markus Zusak", "Historical Fiction", 2005),
    ("One Hundred Years of Solitude", "Gabriel García Márquez", "Magical Realism", 1967),
    ("The Catcher in the Rye", "J.D. Salinger", "Coming of Age", 1951),
    ("The Wind in the Willows", "Kenneth Grahame", "Children's", 1908),
    ("The Name of the Wind", "Patrick Rothfuss", "Fantasy", 2007),
    ("The Count of Monte Cristo", "Alexandre Dumas", "Adventure", 1844),
    ("The Road", "Cormac McCarthy", "Post-Apocalyptic", 2006),
    ("A Song of Ice and Fire", "George R.R. Martin", "Fantasy", 1996),
    ("The Catcher in the Rye", "J.D. Salinger", "Coming of Age", 1951);

INSERT INTO userauth(`name`, `email`, `password`) VALUES ("yashu", "yashu@gmail.com", "yashu"),
  ("hey", "hey@gmail.com", "hey");


INSERT INTO adminauth(`name`, `email`, `password`) VALUES ("yashu", "yashwanth@gmail.com", "yashu");

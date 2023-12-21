/*query create books table*/
CREATE TABLE books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    year INTEGER,
    author VARCHAR(255),
    summary TEXT,
    publisher VARCHAR(255),
    pageCount INTEGER,
    readPage INTEGER,
    finished BOOLEAN,
    reading BOOLEAN,
    insertedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*query for dummy book data*/
INSERT INTO books (name, year, author, summary, publisher, pageCount, readPage, finished, reading)
VALUES
    ('The Great Gatsby', 1925, 'F. Scott Fitzgerald', 'A novel about the American Dream', 'Scribner', 180, 100, true, false),
    ('To Kill a Mockingbird', 1960, 'Harper Lee', 'A classic novel set in the American South', 'J.B. Lippincott & Co.', 281, 200, true, false),
    ('1984', 1949, 'George Orwell', 'A dystopian novel set in a totalitarian society', 'Secker & Warburg', 328, 150, true, false),
    ('The Catcher in the Rye', 1951, 'J.D. Salinger', 'A story about teenage angst and alienation', 'Little, Brown and Company', 224, 80, false, true),
    ('Pride and Prejudice', 1813, 'Jane Austen', 'A romantic novel set in the early 19th century', 'T. Egerton, Whitehall', 279, 50, false, true);
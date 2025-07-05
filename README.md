# Live Link
https://roaring-twilight-d31f97.netlify.app/

# Project Setup
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Make sure the backend server is running (see backend repo).
4. Run the development server using `npm run dev`.
5. Open the app at `http://localhost:5173`.

# Features
- View all books with details.
- Add new books.
- Edit or delete existing books.
- Borrow books with quantity and due date.
- View summary of borrowed books.
- Filter and sort books by genre.
- Responsive design for various screen sizes.

# Tech Stack
- React (Vite)
- TypeScript
- Redux Toolkit & RTK Query
- Tailwind CSS
- ShadCN UI
- React Icons

# Backend API Details

## Books API

### POST `/api/books`
Create a new book.  
- Request body: Book data (JSON)  
- Response: The created book data with success message

### GET `/api/books`
Get a list of books.  
- Query parameters (optional):  
  - `filter`: Filter by genre  
  - `sortBy`: Field to sort by  
  - `sort`: Sort order (`asc` or `desc`)  
  - `limit`: Number of books to return (default 10)  
- Response: List of books with success message

### GET `/api/books/:bookId`
Get details of a single book by its ID.  
- Path parameter: `bookId` (ID of the book)  
- Response: Book data if found; 404 if not found

### PUT `/api/books/:bookId`
Update an existing book by ID.  
- Path parameter: `bookId`  
- Request body: Fields to update  
- Response: Updated book data with success message

### DELETE `/api/books/:bookId`
Delete a book by ID.  
- Path parameter: `bookId`  
- Response: Success message on deletion

## Borrow API

### POST `/api/borrow`
Borrow a book by providing book ID, quantity, and due date.  
- Request body:  
  - `book`: ID of the book to borrow  
  - `quantity`: Number of copies to borrow  
  - `dueDate`: Return due date  
- Response: The borrowed book record with success message

### GET `/api/borrow`
Get a summary of borrowed books grouped by book, including total quantity borrowed for each.  
- Response: List of books with their title, ISBN, and total borrowed quantity

# Useful Links
- Backend Repo: https://github.com/Das203web-dev/level-2-assignment-3  
- Backend Live API: https://level-2-assignment-3-6lyx.onrender.com/  
- Frontend Live Demo: https://roaring-twilight-d31f97.netlify.app/

# Contributing
Contributions are welcome! Feel free to open issues or submit pull requests.

# License
This project is licensed under the MIT License.

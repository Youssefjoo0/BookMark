# Bookmark Manager

A simple web-based bookmark manager that allows users to save, update, delete, and search bookmarks. The project utilizes JavaScript, HTML, CSS, and LocalStorage to persist data.

## Features
- Add bookmarks with site name and URL validation.
- Store bookmarks in LocalStorage.
- Update existing bookmarks.
- Delete bookmarks from the list.
- Search for bookmarks by name or URL.
- Highlight search results.

## Technologies Used
- HTML
- CSS
- JavaScript (Vanilla JS)
- LocalStorage for data persistence

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/bookmark-manager.git
   ```
2. Navigate to the project folder:
   ```sh
   cd bookmark-manager
   ```
3. Open `index.html` in a web browser.

## Usage
1. Enter the site name and URL.
2. Click the **Submit** button to add the bookmark.
3. Click the **Update** button to modify an existing bookmark.
4. Click the **Delete** button to remove a bookmark.
5. Use the search input to find bookmarks dynamically.

## Validation Rules
- Site Name: Must start with a letter, can include letters, numbers, and underscores, and be between 3-16 characters long.
- URL: Must be a valid HTTP/HTTPS URL.

## LocalStorage
- Bookmarks are saved in LocalStorage under the key `item`.
- If the stored data is corrupted, the script resets the bookmark list.

## Contributing
Feel free to fork the repository and submit pull requests.

## License
This project is licensed under the MIT License.


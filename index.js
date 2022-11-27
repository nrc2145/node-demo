const http = require('http');

const hostname = '127.0.0.1'; // localhost
const port = 3000;

const books = JSON.stringify([
  { title: 'The Alchemist', author: 'Paulo Coelho', year: 1988 },
  { title: 'The Prophet', author: 'Kahlil Gibran', year: 1923 },
]);

const authors = JSON.stringify([
  { name: 'Paulo Coelho', countryOfBirth: 'Brazil', yearOfBirth: 1947 },
  { name: 'Kahlil Gibran', countryOfBirth: 'Lebanon', yearOfBirth: 1883 },
]);

const requestListener = function (req, res) {
  console.log(`request url : ${req.url}`);

  res.setHeader('Content-Type', 'application/json');

  switch (req.url) {
    case '/books':
      res.writeHead(200);
      res.end(books);
      break;

    case '/authors':
      res.writeHead(200);

      res.end(authors);
      break;

    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'Resource not found' }));
  }
};

const server = http.createServer((req, res) => {
  requestListener(req, res);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

function handleExit(signal) {
  console.log(`Received ${signal}. Close my server properly.`);
  server.close(function () {
    process.exit(0);
  });
}

process.on('SIGINT', handleExit); // Quit from keyboard (Ctrl + C)
process.on('SIGQUIT', handleExit); // Quit from keyboard (Ctrl + ). It also produce a core dump file.
process.on('SIGTERM', handleExit); // Quit from operating system (using kill command for example).

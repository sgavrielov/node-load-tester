# Node.js Load Tester 🚀

A simple yet powerful CLI tool for performing load tests on APIs and web services.
This script sends multiple concurrent HTTP GET requests to measure performance, response times, and reliability.

## 📌 Features

- ✅ Supports concurrent requests for realistic stress testing
- ✅ Displays total requests, success/failure count, and average response time
- ✅ Uses a lightweight implementation with fetch (no heavy dependencies)
- ✅ Works on Windows, macOS, and Linux
- ✅ Built using Node.js

## 📥 Installation

### Prerequisites

Ensure you have Node.js installed (v16+ recommended).
Check by running:

```sh
node -v
```

### Clone the Repository

```sh
git clone https://github.com/sgavrielov/node-load-tester.git
cd node-load-tester
```

### Install Dependencies

```sh
npm install
```

### Make It Globally Executable

```sh
npm link
```

Now, you can run loadtest from anywhere in your terminal.

## 🚀 Usage

Run the CLI with:

```sh
loadtest <URL> [requests] [concurrency]
```

| Parameter       | Description                      | Default    |
| :-------------- | :------------------------------- | :--------- |
| `<URL>`         | The API or website to test       | (Required) |
| `[requests]`    | Total number of requests to send | 500        |
| `[concurrency]` | Number of concurrent requests    | 50         |

## 📝 Examples

### Basic Load Test

Test an API with 1000 requests, sending 10 requests at a time:

```sh
loadtest http://localhost:3000 1000 10
```

### High-Traffic Load Test

Test an API with 10,000 requests, sending 100 requests at a time:

```sh
loadtest http://localhost:3000 10000 100
```

## 📊 Sample Output

```sh
🚀 Starting load test for http://localhost:3000
🔄 Sending 1,000 requests with 10 concurrency...
✅ Load Test Complete!
💥 Total Requests: 1000
✔️ Successful Requests: 1000
❌ Failed Requests: 0
⚡ Average Response Time: 3.77 ms
```

## 🛠️ How It Works

- 1️⃣ Parses CLI arguments to determine URL, total requests, and concurrency
- 2️⃣ Sends concurrent HTTP GET requests using fetch()
- 3️⃣ Tracks successful & failed requests
- 4️⃣ Calculates average response time

## 📌 Dependencies

This script uses:

`chalk` → Colored console output
`ora` → Loading spinner

### 📌 Install dependencies with:

```sh
npm install
```

## 📝 License

This project is licensed under the MIT License – feel free to use and modify.

## 📌 Contribution

Want to improve this project? Contributions are welcome!
Fork the repo, create a feature branch, and submit a pull request.

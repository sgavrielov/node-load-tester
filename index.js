#!/usr/bin/env node

import chalk from "chalk";
import ora from "ora";

const args = process.argv;
const url = args[2];
const totalRequests = parseInt(args[3], 10) || 500;
const concurrency = parseInt(args[4], 10) || 50;

if (url === undefined) {
  console.error(chalk.red("❌ Error: You must provide a URL."));
  console.log(chalk.yellow("Usage: loadtest <url> [requests] [concurrency]"));
  console.log(chalk.yellow("Example: loadtest http://localhost:3000 1000 10"));
  process.exit(1);
}

/**
 * Formats a number with commas as thousands separators.
 *
 * @param {number} n - The number to format.
 * @returns {string} - The formatted number as a string.
 */
const nf = (n) => new Intl.NumberFormat("en").format(n);

/**
 * Sends a single HTTP GET request and measures the response time.
 *
 * @returns {Promise<{ success: boolean, duration?: number }>}
 *          A promise resolving with the success status and response time.
 */
async function sendRequest() {
  try {
    const start = performance.now();
    await fetch(url);
    const duration = performance.now() - start;
    return { success: true, duration };
  } catch (error) {
    return { success: false };
  }
}

/**
 * Sends multiple concurrent HTTP GET requests to a specified URL for load testing.
 *
 * @param {string} url - The target URL to send requests to.
 * @param {number} tr - The total number of requests to send.
 * @param {number} c - The number of concurrent requests to send at a time.
 * @returns {Promise<{ success: number, failed: number, avgResponseTime: number }>}
 *          A promise that resolves with the total success count, failure count,
 *          and average response time in milliseconds.
 */
async function loadTest(url, tr, c) {
  console.log(chalk.blue(`🚀 Starting load test for ${url}`));
  console.log(
    chalk.yellow(`🔄 Sending ${nf(tr)} requests with ${nf(c)} concurrency...`)
  );

  let totalTime = 0;
  let successfulRequests = 0;
  let failedRequests = 0;

  const spinner = ora("Running load test...").start();

  const requests = [];
  for (let i = 0; i < totalRequests; i++) {
    requests.push(sendRequest());
    if (i % concurrency === 0) {
      const results = await Promise.all(requests.splice(0, concurrency));
      results.forEach((res) => {
        if (res.success) {
          totalTime += res.duration;
          successfulRequests++;
        } else {
          failedRequests++;
        }
      });
    }
  }

  // Process any remaining requests
  const results = await Promise.all(requests);
  results.forEach((res) => {
    if (res.success) {
      totalTime += res.duration;
      successfulRequests++;
    } else {
      failedRequests++;
    }
  });

  spinner.stop();

  const avgTime =
    successfulRequests > 0
      ? (totalTime / successfulRequests).toFixed(2)
      : "N/A";
  console.log(chalk.green(`✅ Load Test Complete!`));
  console.log(chalk.green(`💥 Total Requests: ${totalRequests}`));
  console.log(chalk.green(`✔️ Successful Requests: ${successfulRequests}`));
  console.log(chalk.red(`❌ Failed Requests: ${failedRequests}`));
  console.log(chalk.cyan(`⚡ Average Response Time: ${avgTime} ms`));
}

loadTest(url, totalRequests, concurrency);

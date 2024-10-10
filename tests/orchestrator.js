import retry from "async-retry";

async function waitForAllServices() {
  async function waitForWebServer() {
    async function fetchStatusPage(bail, tryNumber) {
      console.log(tryNumber);
      const response = await fetch("http://localhost:3000/api/v1/status");
      const responseBody = await response.json();
    }

    return retry(fetchStatusPage, {
      retries: 10,
      maxTimeout: 1000,
      minTimeout: 100,
    });
  }
  await waitForWebServer();
}

export default {
  waitForAllServices,
};

import retry from "async-retry";

async function waitForAllServices() {
  async function waitForWebServer() {
    async function fetchStatusPage(bail, tryNumber) {
      const response = await fetch("http://localhost:3000/api/v1/statuss");

      if (response.status !== 200) {
        throw Error();
      }
    }

    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });
  }
  await waitForWebServer();
}

export default {
  waitForAllServices,
};

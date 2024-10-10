const { exec } = require("node:child_process");

const startedAt = Date.now();

function showElapsedTime() {
  return `${((Date.now() - startedAt) / 1000).toFixed(2)}s`;
}

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(`\r⏳ ${showElapsedTime()}`);
      checkPostgres();
      return;
    }
    console.log(
      "\n🟢 \x1b[92mPostgres está pronto e aceitando conexões.\x1b[0m ",
    );
  }
}

process.stdout.write(
  "🟡 \x1b[33mAguardando Postgres aceitar conexões\x1b[0m\n",
);

checkPostgres();

// 🟢 🟡

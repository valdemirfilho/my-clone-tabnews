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
      "\n🟢 \033[92mPostgres está pronto e aceitando conexões.\033[0m ",
    );
  }
}

process.stdout.write(
  "🟡 \033[33mAguardando Postgres aceitar conexões\033[0m\n",
);

checkPostgres();

// 🟢 🟡

const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres-dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }
    console.log(
      "\n🟢 \033[92mPostgres está pronto e aceitando conexões.\033[0m",
    );
  }
}

process.stdout.write("⏳ \033[33mAguardando Postgres aceitar conexões\033[0m");

checkPostgres();

// 🟢

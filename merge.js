const fs = require("fs");
const path = require("path");

const EXTENSIONS = [".html", ".css", ".js", ".json"];
const OUTPUT_FILE = "project_code.txt";

// Очищаем или создаем выходной файл
fs.writeFileSync(OUTPUT_FILE, "", "utf-8");

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    // Игнорируем скрытые папки и node_modules
    if (file.startsWith(".") || file === "node_modules") continue;

    if (stat.isDirectory()) {
      walk(fullPath);
    } else if (
      EXTENSIONS.includes(path.extname(file)) &&
      file !== OUTPUT_FILE &&
      file !== "merge.js"
    ) {
      const separator = `\n\n${"=".repeat(20)}\nФАЙЛ: ${fullPath}\n${"=".repeat(20)}\n\n`;
      fs.appendFileSync(OUTPUT_FILE, separator, "utf-8");
      try {
        const content = fs.readFileSync(fullPath, "utf-8");
        fs.appendFileSync(OUTPUT_FILE, content, "utf-8");
      } catch (e) {
        fs.appendFileSync(
          OUTPUT_FILE,
          `[Ошибка чтения файла: ${e.message}]\n`,
          "utf-8",
        );
      }
    }
  }
}

walk(".");
console.log(`Готово! Все файлы собраны в ${OUTPUT_FILE}`);

function showVerticalMessage(str) {
  const MAX_LENGTH = 6;

  // Убираем пробелы в начале, в конце строки и в нутри строки и переводим строку в нижний регистр
  str = str.trim().replace(/\s/g, "").toLowerCase();

  // Проверяем корректность входных данных
  if (typeof str !== "string" || str.length < MAX_LENGTH || str[0] !== "s") {
    console.log("Неверный ввод.");
    return;
  }

  // Выводим символы строки вертикально
  for (let i = 0; i < MAX_LENGTH; i++) {
    const char = str[i];

    if (i === 0) {
      // Выводим первую букву в верхнем регистре
      console.log(`\\\\\t${char.toUpperCase()}`);
    } else {
      // Выводим остальные буквы в нижнем регистре
      console.log(`\\\\\t${char}`);
    }
  }
}

showVerticalMessage(" s trAd Aghj ");

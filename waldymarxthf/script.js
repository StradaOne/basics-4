for (let i = 0; i < 10; i++) {
  // если true, пропустить оставшуюся часть тела цикла
  if (i % 2 == 0) continue;
  console.log(i); // 1, затем 3, 5, 7, 9
}

for(let i = 0; i < 10; i++) {
	if (i % 2 === 0) {
		console.log(i)
		i++
	}
}
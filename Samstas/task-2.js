const animals = ["cat", "dog", "elephant", "tiger", "lion"];

const sevenLetters = animals.find((animal) => {
  if (animal.length > 7) {
    console.log(animal);
  }
});

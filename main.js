{
    console.log('This is task #1\n');

    const arrayNumbersOne = [1, 5, 2, 7, 9, 8, 5, 6, 8, 6, 7, 7, 0];

    arrayNumbersOne.forEach(element => {
        console.log(`Number is ${element}`);
    });
}

{
    console.log('\nThis is task #2\n');

    const animals = ['cat', 'dog', 'elephant', 'tiger', 'lion'];

    const animal = animals.find(animal => animal.length > 7);

    console.log(`Method 1: ${animal}`);

    animals.unshift('dogecoin');

    const animalFirstIndex = animals.findIndex(animal => animal.length > 7);

    console.log(`Method 2: ${animals[animalFirstIndex]} with index ${animalFirstIndex}`);

    animals.push('dogecoin');

    const dogecoinIndex = animals.indexOf('dogecoin'); //0
    const secondDogecoinIndex = animals.indexOf('dogecoin', dogecoinIndex + 1);

    console.log(`Method 3: ${animals[secondDogecoinIndex]} with index ${secondDogecoinIndex}`);
}

{
    console.log('\nThis is task #3\n');

    const arrayNumbersTwo = [1, 11, -2, 3, -10, 4];
    const arrayNumbersThree = arrayNumbersTwo.filter(element => element < 0);
    console.log(arrayNumbersThree);
}

{
    console.log('\nThis is task #4\n');

    const arrayNumbersFour = [1, 11, -2, 3, -10, 4];
    const arrayNumbersFive = arrayNumbersFour.map(element => Math.abs(element));
    console.log(arrayNumbersFive);
}

{
    console.log('\nThis is task #5\n');

    const arrayNumbersSix = [1, 11, -2, 3, -10, 4];
    let sortedArrayNumbersSix = arrayNumbersSix.sort((firstNumber, secondNumber) => secondNumber - firstNumber);
    console.log(`Method 1: ${sortedArrayNumbersSix}`);

    sortedArrayNumbersSix = arrayNumbersSix.sort((firstNumber, secondNumber) => firstNumber - secondNumber);
    sortedArrayNumbersSix.reverse();
    console.log(`Method 2: ${sortedArrayNumbersSix}`);

    console.log();
}
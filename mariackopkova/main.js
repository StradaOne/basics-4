/*const phoneBook = {
	list: {
	  "John": 123456789,
	  "Jane Doe": 987654321,
	  "Jim Smith": 111111111
	},
	add(name, number) { // добавили метод add с параметрами name и number
	  this.list[name] = number; // добавили number в свойство [name] свойства list
	}
  };*/
  const phoneBook = {
	list:{
	"Aleks": 123456789,
	"Mama": 7894561323,
	"Papa": 4561237989,
	"Brother":159753456,
	"Sister":357159456
    },
	add(name, number){
		this.list[name] = number;
	},
	delete(name){
		delete this.list[name]
	},
  }
  phoneBook.delete("Aleks");
  phoneBook.add("Babyshka",951357456)
  console.log(phoneBook.list);
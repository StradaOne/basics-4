const phoneBook = {
    list: {
    "Natali Lopuhova": 291234564,
    "Vadim": 336116111,
    "Lena": 298202906,
    "Roman": 4504377018,
    },
    ShowList() {
      console.log(this.list);
    }
  
  };
  
  console.log(phoneBook);
  
  phoneBook.list.Ann = 299919919;
  phoneBook.list.Vadim= 131313131;
  phoneBook.list["Natali Lopuhova"] = 3335698;
  
  delete phoneBook.list.Lena;
  
  phoneBook.ShowList();
const someObject = {
    "Steve Camble": 152352352,
    "Morris Body": 235346352,
    "Cavin Brown": 708023850,
  };
  
  console.log(someObject);
  console.log(someObject["Cavin Brown"]);
  
  someObject["Oliver Jontel"] = 793747040;
  
  someObject["Cavin Brown"] = 111111111;
  
  delete someObject["Morris Body"];
  
  console.log(someObject);
  
  someObject.John = 342354234;
  
  console.log(someObject);
  
  console.log(someObject.John);
  console.log(someObject["Cavin Brown"]);
  
//  объект с методом
  
  const object = {
    list: {
      John: 280,
      Bill: 809,
      Carl: 977,
    },
    log() {
      console.log(this.list);
    },
  };
  
  object.log();
  
  const ageOfClients = {
    ageOfAll: {
      Bobby: 34,
      Mar: 87,
      Clara: 78,
      Jimbo: 34,
    },
  
    log() {
      console.log(this.ageOfAll);
    },
  };
  
  delete ageOfClients.ageOfAll.Mar
  
  ageOfClients.log();
  
const Form = document.querySelector(".form")
const Input = document.querySelector(".input")
const Image = document.querySelector(".gender")

Form.addEventListener("submit", (e) => {
	e.preventDefault();
	GetGender();
})

async function GetGender(){
	const Name = Input.value
	const serverUrl = 'https://api.genderize.io';
	const url = `${serverUrl}?name=${Name}`;
	const response = await fetch(url);
	const List = await response.json()
	ShowGender(List.gender);
}

function ShowGender(Gender){
	if (Gender == "male"){
		Image.src = "./images/man.svg"
	} else if (Gender == "female"){
		Image.src = "./images/woman.svg"
	}
}




const fastDOM = (s) => document.querySelector(s);
const fastAll = (s) => document.querySelectorAll(s);


const categories = fastAll(".categori");
const mainSity = fastAll(".mounth");
const mainForm = fastDOM(".window__searchBar");
const mainInput = fastDOM(".Main_input");
const detalisTemp = fastDOM(".Temperature");
const detalisLikes = fastDOM(".Likes");
const detalisWeather = fastDOM(".Weather");
const detalisSunrise = fastDOM(".Sunrise");
const detalisSunset = fastDOM(".Sunset");

export default {
	categories,
	mainForm,
	mainInput,
	detalisTemp,
	detalisLikes,
	detalisWeather,
	detalisSunrise,
	detalisSunset,
	mainSity,
}
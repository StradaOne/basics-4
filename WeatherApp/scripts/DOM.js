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
const placeForLoc = fastDOM(".locations")
const likeIcon = fastDOM(".share")
const titleForLike = fastDOM(".titleForLike")
const mainDegree = fastDOM(".degree-txt")
const mainImage = fastDOM(".main_image-img")

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
	placeForLoc,
	likeIcon,
	titleForLike,
	mainDegree,
	mainImage,
}
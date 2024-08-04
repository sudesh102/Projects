let isDOBOpen = false;
let dateofBirth;
const settingCogEl = document.getElementById("settinsIcon");
const settingContentEl = document.getElementById("settingContent");
const initialTextEl = document.getElementById("initialText");
const afterDOBBtnTxtEl = document.getElementById("afterDOBBtnTxt");
const dobButtonEl = document.getElementById("dobbutton");
const dobInputEl = document.getElementById("dobInput");

const yearEl = document.getElementById("year");
const monthEl = document.getElementById("month");
const dayEl = document.getElementById("day");
const hourEl = document.getElementById("hour");
const minutesEl = document.getElementById("minutes");
const secondEl = document.getElementById("second");
// console.log(localStorage.getItem("year"));

const makeTwoDigitNumber=(number) =>{
    return number>9 ? number:`0${number}`;
};

const toggleDateOfBirthSelector = () => {
    if (isDOBOpen) {
        settingContentEl.classList.add("hide");
    }
    else {
        settingContentEl.classList.remove("hide");
    }
    isDOBOpen = !isDOBOpen;
    console.log("Toggle", isDOBOpen);
};
const updateAge = () => {
    const currentDate = new Date();

    const dateDiff = currentDate - dateofBirth;
    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor((dateDiff / (1000 * 60 * 60 * 24 * 365)) % 12);
    const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
    const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
    const minutes = Math.floor(dateDiff / (1000 * 60)) % 60;
    const second = Math.floor(dateDiff / 1000) % 60;


    yearEl.innerHTML=makeTwoDigitNumber(year);
    monthEl.innerHTML=makeTwoDigitNumber(month);
    dayEl.innerHTML=makeTwoDigitNumber(day);
    hourEl.innerHTML=makeTwoDigitNumber(hour);
    minutesEl.innerHTML=makeTwoDigitNumber(minutes);
    secondEl.innerHTML=makeTwoDigitNumber(second);
};


const setDOBHandler = () => {
    const dateString = dobInputEl.value;
    dateofBirth= dateString ? new Date(dateString):null;
    const year=localStorage.getItem("year");
    const month=localStorage.getItem("month");
    const date=localStorage.getItem("date");
    if(year&&month&&date){
        dateofBirth =new Date(year,month,date);
    }
    if (dateofBirth) {
        localStorage.setItem("year",dateofBirth.getFullYear());
        localStorage.setItem("month",dateofBirth.getMonth());
        localStorage.setItem("day",dateofBirth.getDate());
        initialTextEl.classList.add("hide");
        afterDOBBtnTxtEl.classList.remove("hide");
        // to call at every second
        setInterval(() => updateAge(),1000)
    }
    else {
        afterDOBBtnTxtEl.classList.add("hide");
        initialTextEl.classList.remove("hide");
    }
};
setDOBHandler();

settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);
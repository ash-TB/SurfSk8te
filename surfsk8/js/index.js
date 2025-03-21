const track = document.querySelector(".carousel_content");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel_button--right");
const prevButton = document.querySelector(".carousel_button--left");
const dotsNav = document.querySelector(".carousel_nav");
const dots = Array.from(dotsNav.children);

//height slide one
const slideWidth= slides[0].getBoundingClientRect().width;
console.log(slideWidth);

//arrange slides next one another
//.left is a number property
// slides[0].style.left = slideWidth * 0 + "px";
// slides[1].style.left = slideWidth * 1 + "px";
// slides[2].style.left = slideWidth * 2 + "px";
const setSlidePosition = (slide, index) =>{
    slide.style.left = slideWidth * index + "px"; 
}
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) =>{
    // nextSlide.style.left = amount to move slide
    track.style.transform = "translateX(-" + targetSlide.style.left; + ")";
    currentSlide.classList.remove("current-slide");
    targetSlide.classList.add("current-slide");
}

const updateDots = ((currentDot, targetDot)=>{
    currentDot.classList.remove("current-slide");
    targetDot.classList.add("current-slide");
});

const hideShowArrows = ((slides, prevButton, nextButton, targetIndex)=>{
    if (targetIndex === 0) {
        prevButton.classList.add("is-hidden");
        nextButton.classList.remove("is-hidden");
    }else if (targetIndex === slides.length - 1){
        prevButton.classList.remove("is-hidden");
        nextButton.classList.add("is-hidden");
    }else{
        prevButton.classList.remove("is-hidden");
        nextButton.classList.remove("is-hidden");
    }
})
//when click left move slides left
prevButton.addEventListener("click", e=>{
    const currentSlide = track.querySelector(".current-slide");
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex)
    
});


//when click right move slides to right
//querryselect dot class list no dot
nextButton.addEventListener("click", e=>{
    const currentSlide = track.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector(".current-slide");
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrows(slides, prevButton, nextButton, nextIndex)
});

//when click nav indicator move to that slide
//less event listeners the better bc heavy
dotsNav.addEventListener("click", e=>{
    //what indicator clicked
    //don't evaluate when button not clicked
    const targetDot = e.target.closest("button");
    if(!targetDot) return;
    const currentSlide = track.querySelector(".current-slide");
    const currentDot = dotsNav.querySelector(".current-slide");
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex)

});
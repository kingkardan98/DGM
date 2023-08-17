document.addEventListener("DOMContentLoaded", function() {
    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");
    const book = document.querySelector("#book");

    const openSound = document.querySelector("#opensound");
    const closeSound = document.querySelector("#closesound");
    const flipSound = document.querySelector("#flipsound");

    const cover = document.querySelector("#cover");
    const paper1 = document.querySelector("#p1");
    const paper2 = document.querySelector("#p2");
    const paper3 = document.querySelector("#p3");
    const paper4 = document.querySelector("#p4");
    const paper5 = document.querySelector("#p5");

    let currentLocation = 1;
    let numOfPapers = 6;
    let maxLocation = numOfPapers + 1;

    prevBtn.addEventListener("click", goPrevPage);
    nextBtn.addEventListener("click", goNextPage);

    // Slides book over when opened.
    function openBook() {
        book.style.transform = "translateX(50%)";
        prevBtn.style.transform = "translateX(-200px)";
        nextBtn.style.transform = "translateX(200px)";
    }
    
    // Slides over when closed. Must be conditional:
    // when at the end, it slides to the right,
    // when at the beginning, it slides back to the left.
    function closeBook(isAtBeginning) {
        if (isAtBeginning)
        {
            book.style.transform = "translateX(0%)";
        } else {
            book.style.transform = "translateX(100%)";
        }
        prevBtn.style.transform = "translateX(0px)";
        nextBtn.style.transform = "translateX(0px)";
    }
    function goNextPage() {
        if(currentLocation < maxLocation) {
            switch(currentLocation) {
                case 1:
                    // First page: open the book and flip.
                    openBook();
                    cover.classList.add("flipped");
                    cover.style.zIndex = 1;
                    openSound.play();
                    break;
                case 2:
                    // Second and every other page besides last: flip.
                    paper1.classList.add("flipped");
                    paper1.style.zIndex = 2;
                    flipSound.play();
                    break;
                case 3:
                    // Second and every other page besides last: flip.
                    paper2.classList.add("flipped");
                    paper2.style.zIndex = 3;
                    flipSound.play();
                    break;
                case 4:
                    // Second and every other page besides last: flip.
                    paper3.classList.add("flipped");
                    paper3.style.zIndex = 4;
                    flipSound.play();
                    break;
                case 5:
                    // Second and every other page besides last: flip.
                    paper4.classList.add("flipped");
                    paper4.style.zIndex = 5;
                    flipSound.play();
                    break;
                case 6:
                    // Last page: flip and close book with false, since it's not at the beginning.
                    paper5.classList.add("flipped");
                    paper5.style.zIndex = 6;
                    closeBook(false)
                    closeSound.play();
                    break;
                default:
                    throw new Error("Unknown page state.");
            }
            currentLocation++;
        }
    }

    function goPrevPage() {
        if(currentLocation > 1) {
            switch(currentLocation) {
                case 7:
                    // Last page: reopen book and remove flipped state.
                    paper5.classList.remove("flipped");
                    paper5.style.zIndex = 1;
                    openBook();
                    openSound.play();
                    break;
                case 6:
                    // Every other page besides the first: unflip.
                    paper4.classList.remove("flipped");
                    paper4.style.zIndex = 2;
                    flipSound.play();
                    break;
                case 5:
                    // Every other page besides the first: unflip.
                    paper3.classList.remove("flipped");
                    paper3.style.zIndex = 3;
                    flipSound.play();
                    break;
                case 4:
                    // Every other page besides the first: unflip.
                    paper2.classList.remove("flipped");
                    paper2.style.zIndex = 4;
                    flipSound.play();
                    break;
                case 3:
                    // Every other page besides the first: unflip.
                    paper1.classList.remove("flipped");
                    paper1.style.zIndex = 5;
                    flipSound.play();
                    break;
                case 2:
                    // First page: close book and unflip.
                    // Close book on true, since we are at beginning.
                    cover.classList.remove("flipped");
                    cover.style.zIndex = 6;
                    closeBook(true);
                    closeSound.play();
                    break;
                default:
                    throw new Error("Unknown page state.");
            }
            currentLocation--;
        }

    }
})
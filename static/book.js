document.addEventListener("DOMContentLoaded", function() {
    /* Styling is heavy, let JS wait for the page to be loaded. */
    const prevBtn = document.querySelector("#prev-btn");
    const nextBtn = document.querySelector("#next-btn");
    const book = document.querySelector("#book");
    
    /* Add pages here as needed. */
    const cover = document.querySelector("#cover");
    const paper1 = document.querySelector("#p1");
    
    // Logic for localization
    let currentLocation = 1;
    let numOfPapers = 2;
    let maxLocation = numOfPapers + 1;

    // Event listeners
    prevBtn.addEventListener("click", goPrevPage);
    nextBtn.addEventListener("click", goNextPage);

    // Slides book over when opened.
    function openBook() {
        book.style.transform = "translateX(50%)";
        prevBtn.style.transform = "translateX(-180px)";
        nextBtn.style.transform = "translateX(180px)";
    }
    
    function closeBook() {
    
    }
    
    function goNextPage() {
        if(currentLocation < maxLocation) {
            switch(currentLocation) {
                /* Add pages to the switch as needed. */
                case 1:
                    openBook();
                    cover.classList.add("flipped");
                    cover.style.zIndex = 1;
                    break;
                case 2:
                    paper1.classList.add("flipped");
                    paper1.style.zIndex = 2;
                    closeBook();
                    break;
                default:
                    throw new Error("Unknown page state");
            }
            currentLocation++;
        }
    }
    
    function goPrevPage() {
    
    }
})
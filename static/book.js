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
                /* Add pages to the switch as needed. */
                case 1:
                    // First page: open book and flip page.
                    openBook();
                    cover.classList.add("flipped");
                    cover.style.zIndex = 1;
                    break;
                case 2:
                    // Second case: flip page.
                    // Since it's also the last page, in this case,
                    // also close the book, with isAtBeginning = false.
                    paper1.classList.add("flipped");
                    paper1.style.zIndex = 2;
                    closeBook(false);
                    break;
                default:
                    throw new Error("Unknown page state");
            }
            currentLocation++;
        }
    }
    
    function goPrevPage() {
        if (currentLocation > 1) {
            switch(currentLocation) {
                // Second-to-first page: close the book,
                // and unflip the page.
                case 2:
                    closeBook(true);
                    cover.classList.remove("flipped");
                    cover.style.zIndex = 2;
                    break;
                case 3:
                    // Every other page: unflip the page.
                    // Since it's also the last page, re-open the book.
                    openBook();
                    paper1.classList.remove("flipped");
                    paper1.style.zIndex = 1;
                    break;
                default:
                    throw new Error("Unknown page state.");
            }
            currentLocation--;
        }
    }
})
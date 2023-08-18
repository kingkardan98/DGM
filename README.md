# DGM
#Programming 
#### Video Demo:  <https://www.youtube.com/watch?v=8_I1ryzHZqg>
#### Description:

This small website is a time capsule of sort of a selection of what I've written over the years.
I coded it in HTML, CSS and JS, running it on a Flask instance written in Python.

<hr>

#### Project structure

**DGM/ 
├── static/ 
│       ├── diary_cover.png
│       ├── diary_backcover.png
│       ├── writings_cover.png
│       ├── baseStyle.css 
│       ├── book.js 
│       ├── diary.js 
│       ├── bookStack.css 
│       ├── bookStyle.css 
│       ├── diaryStack.css 
│       ├── folderStyle.css 
│       └── selectorStyle.css 
├── templates/ 
│       ├── about.html 
│       ├── base_book.html 
│       ├── base.html 
│       ├── book_selector.html 
│       ├── diary.html 
│       ├── home.html 
│       └── writings.html 
└── main.py

<hr>
#### File description

Here is a brief description of every file in the tree:

- `static/`
	- `diary_cover.png`, `diary_backcover.png`, `writings_cover.png`
		I created these images myself in Photoshop, so that for the 3D models and the diary page the covers would be better than just a heading. I'm actually pretty proud of the engraving effect!
	
	- `baseStyle.css`
		This is the basic CSS behind every page. In here, I've created the style for the `content` class, which create the shadow effect behind the separate rectangles:
		```css
		.content {
		    margin: 15px;
		    padding: 10px;
		    border: 2px solid black;
		    box-shadow: 5px 6px;
		}
	```
		
		Another effect I created is the highlighting of the links: they start blue, then, on hover, the text turns white, while a black rectangle appears as background:
	```css
		.aStyle:link {
		    color: blue;
		    background-color: beige;
		    padding: 1px 1px;
		    text-align: center;
		}
		
		.aStyle:hover {
		    background-color: black;
		    color: white;
		}
	```
	
	-  `book.js`
		  This is the basis for the `diary.js` file. This script handles the sliding animations on opening and closing a book, and the page flip animation. It also adds sounds to every animation, according to what is happening on screen.
		  
		  The first thing to be done, right after the `DOMContentLoaded` event, is to gather the book and the buttons as elements, as well as the sounds (as to preload them when they're needed to play).
		  ```js
		document.addEventListener("DOMContentLoaded", function() {
			/* Gathering information about the buttons and book */
			const prevBtn = document.querySelector("#prev-btn");
			const nextBtn = document.querySelector("#next-btn");
			const book = document.querySelector("#book");
	
			/* Preloading the sounds */
			const openSound = document.querySelector("#opensound");
			const closeSound = document.querySelector("#closesound");
			const flipSound = document.querySelector("#flipsound");
			/* ... */
		  ```
		
		The script then gathers the individual pages. In `book.js`, only two pages are loaded as `templates/base_book.html` is just a demonstration file, but this is just a matter of how many pages one puts in the HTML template.
		```js
		const cover = document.querySelector("#cover");
		const paper1 = document.querySelector("#p1");
		/* ... */
		const papern = document.querySelector("#pn");
		```
		
		At this point, we create three variables that the script will track to know the current page, the total number of pages, and the total possible states. The total possible states (variable `maxLocation`) is just one more than the number of pages, since there's one state for every page, and one extra for when the book is closed.
		```js
		let currentLocation = 1;
		let numOfPapers = n;
		let maxLocation = numOfPapers + 1;
		```
		
		At this point, we add the event listeners on the buttons, which we associate with the corresponding functions.
		```js
		prevBtn.addEventListener("click", goPrevPage);
		nextBtn.addEventListener("click", goNextPage);
		```
		
		And now the forte: the four main functions.
		
		- `openBook()`
		  This function simply slides the book and buttons over.
			```js
				function openBook() {
				book.style.transform = "translateX(50%)";
				prevBtn.style.transform = "translateX(-200px)";
				nextBtn.style.transform = "translateX(200px)";
			}
			```
		
		- `closeBook()`
		  This function slides the book over conditionally: if we close the last page (we read through the whole book), the book slides to the right; if we close the first page (we reset the book) it slides back in its original position. The buttons behave the same way.
			```js
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
			```
		
		- `goNextPage()`
		  This function detects, with a `switch`, what the value of `currentLocation` is. While this value is less than `maxLocation`, it's still possible to go to the next page. 
		  On every pass, increase `currentLocation` by 1, to signal the flipping of one page.
		  The updating of the `zIndex` attribute simply brings the page in front of all the others.
		  
		  There are some cases to consider:
		  - On the first page, call `openBook()`, play the corresponding sound, and then flip the page.
		  - On the last page, call `closeBook(false)`, since the book is not at the beginning stage; play the corresponding sound, and then flip the page.
		  - On every other page, play the corresponding sound, and flip the page.
			```js
			function goNextPage() {
				if(currentLocation < maxLocation) {
					switch(currentLocation) {
						/* Add pages to the switch as needed. */
						case 1:
							// First page: open book and flip page.
							openBook();
							cover.classList.add("flipped");
							cover.style.zIndex = 1;
							openSound.play();
							break;
						case 2:
							paper1.classList.add("flipped");
							paper1.style.zIndex = 2;
							flipSound.play();
							break;
						/* ... */
						case (n+1):
							// Last page: close book.
							papern.classList.add("flipped");
							papern.style.zIndex = n;
							closeBook(false);
							closeSound.play;
							break;
						default:
							throw new Error("Unknown page state");
					}
					currentLocation++;
				}
			}
			```
		
		- `goPrevPage()`
		  Similar in spirit to `goNextPage()`, just in reverse.
			```js
			function goPrevPage() {
				if (currentLocation > 1) {
					switch(currentLocation) {
						// Second-to-first page: close the book,
						// and unflip the page.
						case 2:
						
							closeBook(true);
							cover.classList.remove("flipped");
							cover.style.zIndex = n;
							closeSound.play();
							break;
						/* ... */
						
						case n+1:
							openBook();
							papern.classList.remove("flipped");
							papern.style.zIndex = 1;
							openSound.play()
							break;
						default:
							throw new Error("Unknown page state.");
					}
					currentLocation--;
				}
			}
			```
	
	- `diary.js`
	  Same in spirit as `book.js`, just more pages.
	
	- `bookstack.css`
	  Simply the ordering of `z-index` for each page, as to stack them in the correct order when first loading.
	  
	- `bookStyle.css`
	  This file expands on the `baseStyle.css` stylesheet with book-specific classes, used for the `diary.html` template.
	  The flipping effect is a simple `rotateY` transformation, done over 0.5 seconds for the pages, and a `translateX` for the buttons over the same period of time.
	  
	  The `book` and `bookImage` classes are made to be of the same dimensions, so the cover fits perfectly on top of it.
	  
	  The `perspective` property of the transformation of the pages just gives it a bit of a 3D look:
		```css
		.front,
		.back {
			background-color: white;
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			transform-origin: left;
			transition: transform 0.5s;
			perspective: 1500pxM
		}
		```
	  
	  On hover, the button slightly changes color too:
		```css
		button {
			border: none;
			background-color: transparent;
			cursor: pointer;
			margin: 10px;
			transition: transform 0.5s;
		}
		
		button:focus {
			outline: none;
		}
		
		button:hover i{
			color: #636363;
		}
		
		i {
			font-size: 50px;
			color: gray;
		}
		```
	  
	- `diaryStack.css`
	  See `bookStack.css`, but specific for the template `templates/diary.html`
	
	- `folderStyle.css`
	  This file defines folder-specific classes, for the folder effect in the `writings.html` template.
	  After defining how a folder should be displayed, and how the words inside it are supposed to look like, the `folderBack`, and subsequent classes, are defined:
	  - The basic properties:
		```css
		.folderBack {
			position: relative;
			width: 100px;
			height: 80px;
			background-color: #4786ff;
			border-radius: 0 5px 5px 5px;
			border: 1px solid black;
		}
		```
	
	  - How it interacts with the papers inside, and the properties of the three papers:
		```css
		.folderBack .paper {
			width: 70%;
			height: 80%;
			background-color: #e6e6e6;
			position: absolute;
			bottom: 10%;
			left: 50%;
			transform: translate(-50%, 10%);
			border-radius: 5px;
			transition: all 0.3s ease-in-out;
		}
		
		.folderBack .paper:nth-child(2) {
			background: #f2f2f2;
			width: 80%;
			height: 70%;
		}
		
		
		
		.folderBack .paper:nth-child(3) {
			background: #f2f2f2;
			width: 90%;
			height: 60%;
		}
		```
	
	  - The cover of the folder:
		```css
		.folderBack .folderFront {
			position: absolute;
			width: 100%;
			height: 100%;
			background: #70a1ff;
			border-radius: 5px;
			transform-origin: bottom;
			transition: all 0.3s ease-in-out;
		}
		```
	
	  - The transformations on hover:
		```css
		.folder:hover {
			transform: translateY(-8px);
		}
		
		.folder:hover .paper{
			transform: translate(-50%, 0%);
		}
		
		.folder:hover .folderFront {
			transform: skew(15deg) scaleY(0.6);
		}
		
		.folder:hover .right {
			transform: skew(-15deg) scaleY(0.6);
		}
		
		.folder:hover .folderName {
			transform: translateX(-7.5%);
		}
		```
	
	- `selectorStyle.css` 
	  Classes specific for the 3D models in the selector page.
	  Classes `page` and `page2` are pretty much equivalent, except for color of the spine of the book.

- `templates/`
	- `about.html`
	  Contact info, a brief description of my life, and a beautiful photo of an incredible specimen.
	  
	- `base_book.html`
	  Basic template for the diary page, extends `base.html`.
	  Loads in default stylesheets, scripts and sounds.	  
		```html
		{% extends "base.html" %}
		
		{% block stylesheets %}
		<link href="./static/bookStyle.css" rel="stylesheet">
		<link href="./static/bookStack.css" rel="stylesheet">
		{% endblock %}
		
		{% block scripts %}
		<script src="./static/book.js"></script>
		{% endblock %}  

		{% block pagetitle %}
		<title>test book</title>
		{% endblock %}  

		{% block body %}
		<audio id="flipsound" src="../static/Paper Sound Effect.mp3" hidden></audio>
		<audio id="opensound" src="../static/Book Flipping Sound Effect.mp3" hidden></audio>
		<audio id="closesound" src="../static/Book Close Sound Effect.mp3" hidden></audio>
		```
	  
	  It then creates a default `pages` block, which can be overwritten later.
		```html
		{% block pages %}
        <div id="cover" class="paper">
            <div class="front">
                <div id="coverfront" class="front-content">
                    <h1>Cover front</h1>
                </div>
            </div>
            <div class="back">
                <div id="coverback" class="back-content">
                    <h1>Cover back</h1>
                </div>
            </div>
        </div>
  
        <div id="p1" class="paper">
            <div class="front">
                <div id="f1" class="front-content">
                    <h1>P1 front</h1>
                </div>
            </div>
  
            <div class="back">
                <div id="b1" class="back-content">
                    <h1>P1 back</h1>
                </div>
            </div>
        </div>
        {% endblock %}
		```
	
	- `base.html`
	  Basic template for the whole project. Bootstrap and the Cormorand font family are imported here, as well as the `baseStyle.css` stylesheet. The navbar is created here, in its own `content` div, and not much else.
		```html
		<div class="content">
			<div id="navbar" class="justify-even">
				<a href="{{ url_for('home') }}" class="aStyle">Home page</a>
				<a href="{{ url_for('selector') }}" class="aStyle">Book selector</a>
				<a href="{{ url_for('diary') }}" class="aStyle">Diary</a>
				<a href="{{ url_for('writings') }}" class="aStyle">Writings</a>
				<a href="{{ url_for('about') }}" class="aStyle">About</a>
			</div>
		</div>
		```
	  
	- `book_selector.html`
	  Simply extend `base.html`, import the `selectorStyle.css` stylesheet, and create two instances of the 3D book models, which act as links.
		```html
	<a href="{{ url_for('diary') }}">
		<div class="page">
			<img src="../static/diary_cover.png" style="width: 370px; height: 600px">
		</div>
	</a>
	
	<a href="{{ url_for('writings') }}">
		<div class="page2">
			<img src="../static/writings_cover.png" style="width: 370px; height: 600px">
		</div>
	</a>
		```
	  
	- `diary.html`
	  Simple extension of `base_book.html`, just add more pages and write in them.
	  
	- `home.html`
	  Simple and brief description of the project, with some links.
	  
	- `writings.html`
	  Extension of `base.html`, and just contains some animated folder instances.
		```html
		<div class="content">
		    <a href="../static/Impressions 1.pdf" class="folderDisplay">
		        <div class="folder">
		            <div class="folderBack">
		                <div class="paper"></div>
		                <div class="paper"></div>
		                <div class="paper"></div>
		                <div class="folderFront">
		                </div>
		                <div class="folderFront right">
		                    <p class="folderName">Impressions #1</p>
		                </div>
		            </div>
		        </div>
		    </a>

		    <a href="../static/Impressions 2.pdf" class="folderDisplay">
		        <div class="folder">
		            <div class="folderBack">
		                <div class="paper"></div>
		                <div class="paper"></div>
		                <div class="paper"></div>
		                <div class="folderFront">
		                </div>
		                <div class="folderFront right">
		                    <p class="folderName">Impressions #2</p>
		                </div>
		            </div>
		        </div>
			</a>
		    /* ... */
		</div>
		```

- `main.py`
  The Flask instance, that simply routes the 5 pages to their respective paths.
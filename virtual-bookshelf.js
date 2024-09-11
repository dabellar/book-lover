/**
 * @author Darleine Abellard
 * CS 132 SP 2024 
 * Creative Project 3: Fetch and APIs
 * 
 * The JS file for the main site functionality for the "virtual library"
 */

(function() {
    "use strict";

    // Global Variables
    const MAX_NUM_THEMES = 6;
    const MODE_LEN = 4;
    const MAX_SEARCH_RESULTS = 3;

    // BASE URLS
    const SPOTIFY_BASE_URL = "https://api.spotify.com/v1/";
    const SPOTIFY_SEARCH_EP = SPOTIFY_BASE_URL + "search?";
    const OPEN_LIB_BASE_URL = "https://openlibrary.org/";
    const OPEN_LIB_SUB_EP = OPEN_LIB_BASE_URL + "subjects/";
    const OPEN_LIB_COVER_EP = "https://covers.openlibrary.org/b/ID/";

    // ACCESS VARIABLES
    const CLIENT_ID = "9be3bed879c84caeb9a238fc1f754438";
    const CLIENT_SECRET = "9e84b1dc7870415ca93cd5663f8a75f4";
    let accessToken;


    async function init() {
        await getAccessToken();
        homepageUI();
    }
    
    /**
     * Uses the 'token' Spotify API endpoint following the Client Credentials flow.
     * https://developer.spotify.com/documentation/general/guides/authorization/client-credentials/
     * Updates the accessToken given the response JSON's token.
     * 
     * @returns {String} - the access token
     */
    async function getAccessToken() {
        try {
            let resp = await fetch("https://accounts.spotify.com/api/token", 
            {
                method: "POST",
                headers: {
                    Authorization: "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET),
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: "grant_type=client_credentials"
            });
            resp = checkStatus(resp);
            const respJson = await resp.json();
            accessToken = respJson.access_token;
        } catch {
            handleError();
        }
    }

    /**
     * Contains the full site UI: 
     *  - change the themes when hovering/clicking over genre cards
     *  - change the section when genre card is clicked
     */
    function homepageUI() {
        let body = qs("body");
        let cardBox = qs("#homepage article");
        let backButton = qs("#back-btn");
        backButton.addEventListener("click", toggleView);
        for (let i = 0; i < MAX_NUM_THEMES; i++) {
            let cardName = cardBox.children[i].id; //theme-name-card
            let cardId = id(cardName);
            let baseName = cardName.substring(0, cardName.length - MODE_LEN); //theme-name-
            let modeName = baseName + "mode"; //theme-name-mode
            cardId.addEventListener("mouseover", () => {
                body.classList = [];
                body.classList.add(modeName);
            });
            cardId.addEventListener("click", () => {
                toggleView();
                populateGenrePage(modeName);
            });
        }
    }

    /**
     * Switches the screen between the homepage and genre sections
     */
    function toggleView() {
        let home = id("homepage");
        home.classList.toggle("hidden");
        let genrePage = id("genre-page");
        genrePage.classList.toggle("hidden");
    }

    /**
     * Populates #genre-page with given string's corresponding info
     * 
     * @param {String} playlistTopic - one of the pre-made playlist topics 
     * with the format (theme-name-mode)
     */
    function populateGenrePage(playlistTopic) {
        clearGenrePage();
        // populate text content with category specific content
        let playlist = new AudiobookPlaylist(playlistTopic);
        let name = playlist.name;
        let desc = playlist.description;
        let books = playlist.books;
        let genreNameCon = id("genre-name");
        genreNameCon.textContent = name;
        let genreDescCon = id("genre-desc");
        genreDescCon.textContent = desc;
        // populate book cards by category type
        let searchBar = id("cyoa-search");
        // if in search category
        if (playlistTopic === "cyoa-mode") {
            searchBar.classList.remove("hidden");
            searchBar.addEventListener("change", () => {
                clearGenrePage();
                if (searchBar.value) {
                    fetchBooksBySubject(searchBar.value);
                }
            });
        } else {
            // if in pre-curated category
            searchBar.classList.add("hidden");
            books.forEach((bookTuple) => {
                let bookTitle = bookTuple[0];
                let bookAuthor = bookTuple[1];
                fetchAudiobook(bookTitle, bookAuthor);
            });
        }
    }

    /**
     * Uses the 'Subjects' Open Library endpoint
     * https://openlibrary.org/dev/docs/api/subjects
     * 
     * Fetches books from the Open Library API using a given subject title and 
     * populates book results 
     * 
     * @param {String} input - subject to search
     */
    async function fetchBooksBySubject(input) {
        let name = formatSearchInput(input);
        let url = OPEN_LIB_SUB_EP + name + ".json?ebooks=true&limit=30";
        try {
            let resp = await fetch(url);
            resp = checkStatus(resp); 
            const respJson = await resp.json();
            makeBookCards(false, name, respJson);
        } catch (err) {
            handleError(err);
        }
    }

    /**
     * Uses the 'search' Spotify API endpoint:
     * https://developer.spotify.com/documentation/web-api/reference/search
     * 
     * Fetches audiobooks from the Spotify API using a given a book title and author
     * populates book results 
     * 
     * @param {String} name - title of the books from Playlist obj
     * @param {String} author - name of the author (for sanity check)
     */
    async function fetchAudiobook(name, author) {
        let encodedName = encodeURIComponent(name);
        let url = SPOTIFY_SEARCH_EP + "&type=audiobook" + "&limit=" + MAX_SEARCH_RESULTS + "&q=" + encodedName; 
        try {
            let resp = await fetch(url, {
                headers: {
                  Authorization: `Bearer ${accessToken}`
                }
            });
            resp = checkStatus(resp);
            let respJson = await resp.json();
            makeBookCards(true, author, respJson);
        } catch {
            handleError();
        }
    }

    /**
     * Generates book figs and appends to #genre-page 
     * 
     * @param {Boolean} spotify - whether or not Spotify data is being used
     * @param {String} givenAuthor - author name from playlist object
     * @param {Object} data - Book JSON object
     */
    function makeBookCards(spotify, givenAuthor, data) {
        let bookcase = id("bookcase");
        let books = [];
        if (spotify) {
            books = data.audiobooks.items;
        } else {
            books = data.works;
        }
        if (books.length === 0) {
            const pEmpty = gen("p");
            pEmpty.textContent = "Sorry! Try searching something else!";
            bookcase.appendChild(pEmpty);
        } 
        for (let i = 0; i < books.length; i++) {
            if (spotify) {
                let author = books[i].authors[0].name;
                if (author === givenAuthor) {
                    let card = genBookFig(spotify, books[i]);
                    bookcase.appendChild(card);
                    return;
                }
            } else {
                let card = genBookFig(spotify, books[i]);
                bookcase.appendChild(card);
            }
        }
    }

    /**
     * Takes book info and returns a figure with book info
     * 
     * @param {Boolean} spotify - whether or not Spotify data is being used
     * @param {Object} bookInfo - one nook JSON object
     * @returns {DOMElement} - a figure representing the given book
     */
    function genBookFig(spotify, bookInfo) {
        const newCard = gen("figure");

        const img = gen("img");
        let url = "";
        if (spotify) {
            if (bookInfo.images[0]) {
                img.src = bookInfo.images[0].url;
            } else {
                img.src = "imgs/image-not-avail.jpeg";
            }
            img.alt = bookInfo.name;
        } else {
            if (bookInfo.cover_id) {
                url = OPEN_LIB_COVER_EP + bookInfo.cover_id + "-L.jpg";
            } else {
                url = "imgs/image-not-avail.jpeg";
            }
            img.src = url;
            img.alt = bookInfo.title;
        }
        newCard.appendChild(img);

        const figCap = gen("figcaption");
        figCap.classList.add("overlay");

        const pTitle = gen("p");
        pTitle.textContent = "Title: ";

        const spanTitle = gen("span");
        if (spotify) {
            spanTitle.textContent = bookInfo.name;
        } else {
            spanTitle.textContent = bookInfo.title;
        }

        pTitle.appendChild(spanTitle);

        figCap.appendChild(pTitle);

        const pAuthor = gen("p");
        pAuthor.textContent = "Author(s): " + formatCommaList(bookInfo.authors);
        figCap.appendChild(pAuthor);

        if (spotify) {
            const pNarrators = gen("p");
            pNarrators.textContent = "Narrator(s): " + formatCommaList(bookInfo.narrators);
            figCap.appendChild(pNarrators);
        }

        newCard.appendChild(figCap);

        return newCard;
    }

/********************************** HELPER FUNCTIONS *************************************/

    /**
     * Clears the contents of the #genre-page section
     */
    function clearGenrePage() {
        let bookcase = id("bookcase");
        while (bookcase.firstChild) {
            bookcase.removeChild(bookcase.firstChild);
        }
        let msgArea = qs("#genre-page .message-area");
        msgArea.textContent = "";
    }

    /**
     * Formats the given string to make it suitable for searching
     * Ex: "     computer science  " -> "computer_science"
     * 
     * @param {String} str - string in need of formatting 
     * @returns {String} a string formatted for API search
     */
    function formatSearchInput(str) {
        return str.toLowerCase().trim().replace(/ /g, "_");
    }

    /**
     * Formats a list of JSON objects with the key "name" 
     * as a string of names separated by commas
     * 
     * @param {Object} jsonList - a list of JSON objects that include the key "name"
     * @returns {String} names separated by commas
     */
    function formatCommaList(jsonList) {
        let arr = [];
        for (let i = 0; i < jsonList.length; i++) {
            arr.push(jsonList[i].name);
        }
        return arr.map(String).join(", ");
    }

    /* -------------------- Custom Error-handling -------------------- */  
    /**
     * Displays an error message on the page, hiding any previous results.
     * If errMsg is passed as a string, the string is used to customize an error message.
     * Otherwise (the errMsg is an object or missing), a generic message is displayed.
     * 
     * @param {String} errMsg - optional specific error message to display on page.
     */
    function handleError(errMsg) {
        if (typeof errMsg === "string") {
            qs(".message-area").textContent = errMsg;
        } else {
            // the err object was passed, don't want to show it on the page;
            // instead use generic error message.
            qs(".message-area").textContent =
                "An error ocurred fetching the data. Please try again later.";
        }
        qs(".message-area").classList.remove("hidden");
    }

    init();
})();
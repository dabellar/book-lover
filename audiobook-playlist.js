"use strict";
/**
 * @author Darleine Abellard
 * Creative Project 3: Virtual Library
 * 
 * The JS file for the "playlists" since the Spotify API (as of September 2024) 
 * does not show the audiobooks in a playlist when getting a public audiobook playlist
 * by any author (me, another user, or Spotify's curated playlists)
 * 
 * Playlists are built here and used in main js file
 * 
 */

/**
 * class for Audiobook "playlist", containing the name of 
 * playlist, playlist description, and book titles and authors
 */
class AudiobookPlaylist {
    /**
     * AudiobookPlaylist class constructor 
     * can either provide pre-made type or make empty "playlist"
     * 
     * @param {String} type - theme for pre-made "playlist"
     */
    constructor(type) {
        let constructors = [];
        if (type === "romance-mode") {
            constructors = romance();
        } else if (type === "classics-mode") {
            constructors = classics();
        } else if (type === "fav-mode") {
            constructors = darleineRecs();
        } else if (type === "mys-thrill-mode") {
            constructors = mysThrill();
        } else if (type === "sci-fantasy-mode") {
            constructors = sciFantasy();
        } else if (type === "cyoa-mode") {
            constructors = cyoa();
        } else {
            constructors = ["", "", [], 0];
        }
        this.name = constructors[0];
        this.description = constructors[1];
        this.books = constructors[2];
        this.length = constructors[3];
    }

    /**
     * Resets the playlist object
     */
    reset() {
        this.name = "";
        this.description = "";
        this.books = [];
        this.length = 0;
    }
}
    /**
     * Creates the search constructor array for the romance "playlist"
     * 
     * @returns {Array} constructor array for the romance category
     */
    function romance() {
        let constructor = [];
        let name = "Love is in the Air";
        let description = `Romance books been celebrated for their exploration of emotional connections 
                while also delivering engaging stories. Romance books (and things liked mostly by women 
                in general) get a bad rap, but I think people are looking at the genre wrong. Romance is 
                broad, and there are many subgenres, ranging from historical to sports. Each provide a 
                unique perspective on something that has been discussed since the beginning of time. As 
                long as there are people on this earth, there will be new ways to think about love. This 
                is a list of some of the most popular romance books. `;
        let books = [];
        books.push(["Red, White and Royal Blue", "Casey McQuiston"]);
        books.push(["Romancing Mister Bridgerton", "Julia Quinn"]);
        books.push(["Funny Story","Emily Henry"]);
        books.push(["How to End a Love Story","Yulin Kuang"]);
        books.push(["Just for the Summer","Abby Jimenez"]);
        books.push(["Pride and Prejudice","Jane Austen"]);
        books.push(["A Court of Thorns and Roses","Sarah J. Maas"]);
        books.push(["The Hating Game","Sally Thorne"]);
        books.push(["The Seven Husbands of Evelyn Hugo","Taylor Jenkins Reid"]);
        books.push(["The Song of Achilles","Madeline Miller"]);
        books.push(["To All the Boys I've Loved Before","Jenny Han"]);
        books.push(["Romeo and Juliet","William Shakespeare"]);
        books.push(["A Little Kissing Between Friends", "Chencia C. Higgins"]);
        books.push(["The Seven Year Slip", "Ashley Poston"]);
        books.push(["Take a Hint, Dani Brown", "Talia Hibbert"]);
        books.push(["Wuthering Heights", "Emily Brontë"]);
        books.push(["The Love Hypothesis", "Ali Hazelwood"]);
        books.push(["Jane Eyre", "Charlotte Brontë"]);
        let length = books.length;
        constructor.push(name);
        constructor.push(description);
        constructor.push(books);
        constructor.push(length);
        return constructor;
    }

    /**
     * Creates the search constructor array for the classics "playlist"
     * 
     * @returns {Array} constructor array for the classics category
     */
    function classics() {
        let constructor = [];
        let name = "Required Reads";
        let description = `Classics are timeless works of literature that have had a profound impact on 
                our culture, enduring through generations due to their universal themes, compelling 
                characters, and masterful storytelling. However, the debate over what is considered a 
                "classic" is ongoing and multifaceted. My definition of a classic is a book that has stuck 
                with its readers and shaped how they read and view books as a whole. 
                This is a (non-comprehensive!) list of what I consider to be classics. Your list of classics 
                may be different, and that's amazing! Disagreements are the spice of life.`;
        let books = [];
        books.push(["1984","George Orwell"]);
        books.push(["Little Women","Louisa May Alcott"]);
        books.push(["The Outsiders","S. E. Hinton"]);
        books.push(["Holes","Louis Sachar"]);
        books.push(["Charlotte's Web","E. B. White"]);
        books.push(["Flowers for Algernon","Daniel Keyes"]);
        books.push(["Their Eyes Were Watching God","Zora Neale Hurston"]);
        books.push(["I Know Why the Caged Bird Sings","Maya Angelou"]);
        books.push(["The Great Gatsby","F. Scott Fitzgerald"]);
        books.push(["Little House on the Prairie","Laura Ingalls Wilder"]);
        books.push(["The Little Prince by Antoine","Antoine de Saint-Exupéry"]);
        books.push(["Northanger Abbey","Jane Austen"]);
        books.push(["To Kill a Mockingbird", "Harper Lee"]);
        books.push(["One Hundred Years of Solitude", "Gabriel García Márquez"]);
        books.push(["Beloved", "Toni Morrison"]);
        let length = books.length;
        constructor.push(name);
        constructor.push(description);
        constructor.push(books);
        constructor.push(length);
        return constructor;
    }

    /**
     * Creates the search constructor array for the mystery/thriller "playlist"
     * 
     * @returns {Array} constructor array for the mystery/thriller category
     */
    function mysThrill() {
        let constructor = [];
        let name = "Who Done It?";
        let description = `Mystery and Thriller books use suspense, intrigue, wit, and high-stakes 
                situations to captivate readers. These genres aim to keep readers on the edge of their seats,
                weaving complex plots filled with unexpected twists and turns with enticing characters and 
                beautiful scenes. Here are some of the most popular books in this genre!`;
        let books = [];
        books.push(["The Girl with the Dragon Tattoo","Stieg Larsson"]);
        books.push(["Gone Girl","Gillian Flynn"]);
        books.push(["The Da Vinci Code","Dan Brown"]);
        books.push(["Big Little Lies","Liane Moriarty"]);
        books.push(["The Silent Patient","Alex Michaelides"]);
        books.push(["In the Woods","Tana French"]);
        books.push(["The Woman in the Window","A. J. Finn"]);
        books.push(["Ace of Spades","Faridah Àbíké-Íyímídé"]);
        books.push(["The Girl on the Train","Paula Hawkins"]);
        books.push(["Before I Go to Sleep","S. J. Watson"]);
        books.push(["Shutter Island","Dennis Lehane"]);
        books.push(["Sherlock Holmes - The Hound of the Baskervilles","Sir Arthur Conan Doyle"]);
        books.push(["Rebecca","Daphne du Maurier"]);
        books.push(["The Reversal","Michael Connelly"]);
        books.push(["The No. 1 Ladies' Detective Agency","Alexander McCall Smith"]);
        books.push(["The Shining","Stephen King"]);
        books.push(["All Good People Here", "Ashley Flowers"]);
        books.push(["Bright Young Women", "Jessica Knoll"]);
        let length = books.length;
        constructor.push(name);
        constructor.push(description);
        constructor.push(books);
        constructor.push(length);
        return constructor;
    }

    /**
     * Creates the search constructor array for the recommendations "playlist"
     * 
     * @returns {Array} constructor array for the recommendations category
     */
    function darleineRecs() {
        let constructor = [];
        let name = "My Recommendations";
        let description = `Here are books I've read and loved for various reasons. As you can see, 
                I'm very into Black/Black-fem focused literature. However, the genres range from biographies to 
                sci-fi to thrillers. I was introduced to some of these through electives I've taken in high school 
                and college. Some of these were given to me by my english professor or recommended to me by
                a friend. I found one of these books just browsing free audiobooks my library provides!`;
        let books = [];
        books.push(["Feel Free : Essays","Zadie Smith"]);
        books.push(["The Anthropocene Reviewed: Essays on a Human-Centered Planet","John Green"]);
        books.push(["Kindred","Octavia Butler"]);
        books.push(["Krik? Krak!","Edwidge Danticat"]);
        books.push(["Dawn: Lilith's Brood","Octavia E. Butler"]);
        books.push(["Girl, Woman, Other","Bernardine Evaristo"]);
        books.push(["Binti","Nnedi Okorafor"]);
        books.push(["An Unkindness of Ghosts","Rivers Solomon"]);
        books.push(["The Other Black Girl","Zakiya Dalila Harris"]);
        books.push(["I'm Glad My Mom Died","Jennette McCurdy"]);
        books.push(["Lessons In Chemistry","Bonnie Garmus"]);
        books.push(["Giovanni's Room","James Baldwin"]);
        books.push(["all about love", "bell hooks"]);
        books.push(["Go Tell It on the Mountain", "James Baldwin"]);
        books.push(["Crying in H Mart", "Michelle Zauner"]);
        let length = books.length;
        constructor.push(name);
        constructor.push(description);
        constructor.push(books);
        constructor.push(length);
        return constructor;
    }

    /**
     * Creates the search constructor array for the Sci-fi/Fantasy "playlist"
     * 
     * @returns {Array} constructor array for the sci-fi/fantasy category
     */
    function sciFantasy() {
        let constructor = [];
        let name = "Wizards, Warps, and Wormholes";
        let description = `Science Fiction (Sci-fi) books are an interesting genre that explores the 
                possibilities of science and technology beyond the boundaries of our current reality. Fantasy 
                books transport readers into magical worlds filled with mythical creatures and take them 
                on extraordinary adventures that require an author to create an entire universe with their own rules,
                histories, and cultures. I know these are two different genres (sci-fi and fantasy fans don't 
                stone me please. I just wanted both genres to be represented), but the amount of world-building, 
                imagination, and all around creativity required in writing and reading these books are comparable. 
                They blend science, unrestricted imagination, and literature in a fun and engaging way. 
                These are some of the most popular books in both genres!`;
        let books = [];
        books.push(["Frankenstein","Mary Shelley"]);
        books.push(["The Library at Mount Char","Scott Hawkins"]);
        books.push(["Under the Whispering Door","TJ Klune"]);
        books.push(["Ready Player One","Ernest Cline"]);
        books.push(["The Hitchhiker's Guide to the Galaxy","Douglas Adams"]);
        books.push(["Parable of the Sower","Octavia E. Butler"]);
        books.push(["The Three-Body Problem","Cixin Liu"]);
        books.push(["The Long Way to a Small, Angry Planet","Becky Chambers"]);
        books.push(["The Ministry of Time: A Novel","Kaliane Bradley"]);
        books.push(["Annie Bot","Sierra Greer"]);
        books.push(["The Midnight Library","Matt Haig"]);
        books.push(["Dune","Frank Herbert"]);
        books.push(["Foundation", "Isaac Asimov"]);
        books.push(["The Hobbit", "J.R.R. Tolkien"]);
        books.push(["The Invisible Man", "H. G. Wells"]);
        let length = books.length;
        constructor.push(name);
        constructor.push(description);
        constructor.push(books);
        constructor.push(length);
        return constructor;
    }

    /**
     * Creates the search constructor array for the search "playlist"
     * 
     * @returns {Array} constructor array for the search (Choose Your Own Adventure) category
     */
    function cyoa() {
        let constructor = [];
        let name = "Choose Your Own Adventure";
        let description = `What are you interested in reading? I've only offered five categories 
                to look through, which is not comprehensive at all. Simply search a topic and dive deep into 
                the options available (according to Open Library)! I'm not 100% sure that Spotify will have
                these available, but the beauty of books and modern technology is that there is definitely 
                a book out there for you and multiple different ways to read it. Happy searching!`;
        let books = [];
        let length = 0;
        constructor.push(name);
        constructor.push(description);
        constructor.push(books);
        constructor.push(length);
        return constructor;
    }

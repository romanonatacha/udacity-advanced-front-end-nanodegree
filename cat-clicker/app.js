(function () {
    var catCount = document.getElementById("catCount");

    var CatButton = function (selector) {
        this.element = document.getElementById(selector);
        this.catClickCount = 0;
    };

    CatButton.prototype.addEvent = function (event, fn) {
        this.element.addEventListener(event, fn);
    };

    var Cat = {
        image: document.getElementById("catImage"),
        title: document.getElementById("catTitle"),
        setSrc: function (src) {
            this.image.src = src;
        },
        setTitleText: function (title) {
            this.title.innerHTML = title;
        }
    };

    var catButtonOne = new CatButton("catButtonOne");
    var catButtonTwo = new CatButton("catButtonTwo");
    var catButtonThree = new CatButton("catButtonThree");
    var catButtonFour = new CatButton("catButtonFour");
    var catButtonFive = new CatButton("catButtonFive");

    catButtonOne.addEvent("click", function () {
        addCatInfo(this, "kitten.jpg", "Luna");
    }.bind(catButtonOne));

    catButtonTwo.addEvent("click", function () {
        addCatInfo(this, "kitten-2.jpg", "Fred");
    }.bind(catButtonTwo));

    catButtonThree.addEvent("click", function () {
        addCatInfo(this, "kitten-3.jpg", "Mike");
    }.bind(catButtonThree));

    catButtonFour.addEvent("click", function () {
        addCatInfo(this, "kitten-4.jpg", "Frida");
    }.bind(catButtonFour));

    catButtonFive.addEvent("click", function () {
        addCatInfo(this, "kitten-5.jpg", "Venus");
    }.bind(catButtonFive));

    function addCatInfo(selfElement, catSrc, catTitle) {
        Cat.setSrc(catSrc);
        Cat.setTitleText(catTitle);
        selfElement.catClickCount++;
        catCount.innerHTML = selfElement.catClickCount;
    }

}());
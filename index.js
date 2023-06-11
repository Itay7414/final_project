function addFruit() {
    var fruitInput = document.getElementById("fruitInput");
    var fruitName = fruitInput.value;

    if (fruitName.trim() !== "") {
        var fruitsList = document.getElementById("fruitsList");
        var listItem = document.createElement("li");
        listItem.textContent = fruitName;
        fruitsList.appendChild(listItem);
        fruitInput.value = "";
    }
}

function addVegetable() {
    var vegetableInput = document.getElementById("vegetableInput");
    var vegetableName = vegetableInput.value;

    if (vegetableName.trim() !== "") {
        var vegetablesList = document.getElementById("vegetablesList");
        var listItem = document.createElement("li");
        listItem.textContent = vegetableName;
        vegetablesList.appendChild(listItem);
        vegetableInput.value = "";
    }
}

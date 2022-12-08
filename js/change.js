createOptionsMaterials('battery-select');
createOptionsMaterials('matrixPack-select');
createOptionsMaterials('matrice-select');
createOptionsMaterials('materials-select');
createOptionsMaterials('boxes-select');

document.getElementById('change-amound-batteries').addEventListener('submit', handleSubmit);
document.getElementById('change-amound-materials').addEventListener('submit', handleSubmit);
document.getElementById('change-amound-boxes').addEventListener('submit', handleSubmit);

createLists('battery-list');
createLists('boxes-list');
createLists('materials-list');

document.getElementById('addDimensional').addEventListener('click', function(e){
    let amount = parseInt(prompt("How many runs have you done?", "Only numbers!"));
    if(isNaN(amount)){
        return;
    }
    feedback(e.target.id);
    let boxes = JSON.parse(localStorage.getItem('boxes'));
    boxes[0].amound += (2*amount);
    boxes[1].amound += (2*amount);
    boxes[2].amound += (1*amount);
    boxes[3].amound += (1*amount);
    localStorage.setItem('boxes', JSON.stringify(boxes));
    createLists('boxes-list');
})
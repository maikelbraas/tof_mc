class Calculation{
    materialsSoort;
    constructor(){
        this.materialsSoort = JSON.parse(localStorage.getItem('simulacraMaterials'));
    }
    
    calcMats(name, levelStart, levelEnd){
        let simuTest = JSON.parse(localStorage.getItem('simulacrum'));
        let simus = this.calcSimuNeeded(name, levelStart, levelEnd, simuTest);
        return simus;
    }

    /*
        Start creating object of materials needed.
    */
    calcSimuNeeded(name, levelStart, levelEnd, simuObj){
        let tempArr = [];
        for(let [key, value] of Object.entries(simuObj)){
            if(value.name == name && value.level >= levelStart && value.level <= levelEnd){
                this.runThroughMaterials(tempArr, value);
            }
        }
        let tempMaterials = this.createObjectOfMaterials(tempArr);
        tempMaterials['name'] = name;
        levelEnd+=10;
        tempMaterials['level'] = `<div>Name: ${name} - Current: ${levelStart.toString()} - Goal: ${levelEnd.toString()}</div>`;
        tempMaterials['gold'] += tempMaterials['exp'];
        return tempMaterials;
    }

    /*
        Check simulacrum with existing materials, store materials as object into array. 
            {material name : material amount}
    */
    runThroughMaterials(tempArr, obj){
        for(let i = 0; i < this.materialsSoort.length; i++){
            let temp = this.materialsSoort[i];
            if(obj[temp]){
                tempArr.push({[temp] : obj[temp]});
            }
        }
    }

    /*
        Refactor array of object to single object with cumulative amounts.
        [{materialName : materialAmount}, {materialName : materialAmount}, etc...]
        {materialName : cumulativeMaterialAmount, materialName : cumulativeMaterialAmount, etc...}
    */
    createObjectOfMaterials(tempArr){
        let tempMaterials = {};
        for(let [key, value] of Object.entries(tempArr)){
            this.checkIfMaterialExists(tempMaterials, value);
        }
        return tempMaterials;
    }

    /*
        Walk through every object and add the material amount to existing property
    */
    checkIfMaterialExists(tempArr, value){
        if(tempArr[Object.keys(value)]){
            tempArr[Object.keys(value)] += Object.values(value)[0];
        }else{
            tempArr[Object.keys(value)] = Object.values(value)[0];
        }
    }

    /*
        Add second character to goalNeeded local storage.
        Add needed materials to existing object.
        Create local storage of goalNeeded.
    */
    calcNeeded(){
        let have = JSON.parse(localStorage.getItem('needed'));
        let amound = {};
        for(let i = 0; i < have.length; i++){
            for(let [key, value] of Object.entries(have[i])){
                if(amound[key]){
                    if(typeof value == 'string'){
                        amound[key] += ", " + value;
                    }else{
                        amound[key] += value;
                    }
                }else{
                    amound[key] = value;
                }
            }
        }

        localStorage.setItem('goalNeeded', JSON.stringify([amound]));

    }
}
class Storage{
    materials = localStorage.getItem('materials')



    createNewStorage(name, data){
        localStorage.setItem(name, data)
        localStorage.setItem('storages', [name]);
    }

    appendStorageMaterial(name, data){
        let oldStorage = JSON.parse(localStorage.getItem(name))
        oldStorage.push(new Material(data));
        localStorage.setItem(name, JSON.stringify(oldStorage));
    }
    
    appendStorageSimulacra(item, name, materials, amound){
        let oldStorage = JSON.parse(localStorage.getItem(item))
        oldStorage.push(new Simulacra(name, materials, amound));
        localStorage.setItem(item, JSON.stringify(oldStorage));
    }

    appendStorageNeeded(item, data){
        let oldStorage = JSON.parse(localStorage.getItem(item))
        for(let [key, value] of Object.entries(oldStorage)){
            if(value.name == data.name){
                return;
            }
        }
        oldStorage.push(data);
        localStorage.setItem(item, JSON.stringify(oldStorage));
    }


}
const storage = new Storage();
const calc = new Calculation();

/*
    Handle the different submits in the site.
*/
function handleSubmit(e) {
    feedback(e.target.id);
    e.preventDefault();
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);
    if(e.target.id == "calc-amound-runs" && localStorage.hasOwnProperty('goalNeeded')){
        createSimListShortage('shortage-list', Number(formProps.times), formProps.bounty, formProps.build, formProps.thisWeek);
        document.getElementById('shortage-content').style.display = 'grid';
        clearInput();
        return;
    }
    if(e.target.id == "needed" && !localStorage.hasOwnProperty('needed')){
        storage.createNewStorage('needed', JSON.stringify([calc.calcMats(formProps.name, Number(formProps.levelStart), Number(formProps.levelEnd))]));
        calc.calcNeeded();
        createSimListNeed('goalNeeded-list');
        document.getElementById('goalNeeded-content').style.display = 'grid';
        clearInput();
        return;
    }
    if(e.target.id == "change-amound-materials" && e.target.classList[0] == 'materials'){
        changeAmound(e.target.classList[0], formProps.materials, Number(formProps.amound));
        createLists('materials-list');
        document.getElementById('materials-content').style.display = 'grid';
        clearInput();
        return;
    }else if(e.target.id == "change-amound-boxes" && e.target.classList[0] == 'boxes'){
        changeAmound(e.target.classList[0], formProps.boxes, Number(formProps.amound));
        createLists('boxes-list');
        document.getElementById('boxes-content').style.display = 'grid';
        clearInput();
        return;
    }else if(e.target.id == "change-amound-matrice" && e.target.classList[0] == 'matrice'){
        changeAmound(e.target.classList[0], formProps.matrice, Number(formProps.amound));
        createLists('matrice-list');
        document.getElementById('matrice-content').style.display = 'grid';
        clearInput();
        return;
    }else if(e.target.id == "change-amound-matrix" && e.target.classList[0] == 'matrixPack'){
        changeAmound(e.target.classList[0], formProps.matrixPack, Number(formProps.amound));
        createLists('matrixPack-list');
        document.getElementById('matrixPack-content').style.display = 'grid';
        clearInput();
        return;
    }else if(e.target.id == "change-amound-batteries" && e.target.classList[0] == 'battery'){
        changeAmound(e.target.classList[0], formProps.battery, Number(formProps.amound));
        createLists('battery-list');
        document.getElementById('battery-content').style.display = 'grid';
        clearInput();
        return;
    
    }else{
        if(localStorage.hasOwnProperty(e.target.id)){
            if(e.target.id == "materials" || e.target.id == "boxes"){
                storage.appendStorageMaterial(e.target.id, formProps.name, Number(formProps.amound));
                clearInput();
                return;
            }else if(e.target.id == 'needed' && localStorage.hasOwnProperty('needed')){
                storage.appendStorageNeeded('needed', calc.calcMats(formProps.name, Number(formProps.levelStart), Number(formProps.levelEnd)));
                calc.calcNeeded();
                createSimListNeed('goalNeeded-list');
                document.getElementById('goalNeeded-content').style.display = 'grid';
                clearInput();
                return;
            }
        }else{
            if(e.target.id == "materials" || e.target.id == "boxes"){
                storage.createNewStorage(e.target.id, JSON.stringify([new Material(formProps.name, Number(formProps.amound))]));
                clearInput();
                return;
            }else{
                storage.createNewStorage(e.target.id, JSON.stringify([new Simulacra(formProps.name, Number(formProps.level), formData.getAll('material'), formData.getAll('amound'))]));
                clearInput();
                return;
            }
            
        }
    }

}

/**
 * Clear the inputs when submitted
 */
function clearInput(){
    for(const input of document.querySelectorAll('input[type=number]')){
        input.value = "";
    }
}

/**
 * Creates the option boxes in the materials drop down menu.
 */
function createOptionsMaterials(item){
    for(let i = 0; i < document.getElementsByClassName(item).length; i++){
        let select = document.getElementsByClassName(item)[i];
        let store = JSON.parse(localStorage.getItem(item.replace('-select', '')));
        for(let i = 0; i < store.length; i++){
            let opt = document.createElement('option');
            opt.value = store[i].name;
            opt.innerHTML = store[i].name;
            select.appendChild(opt)
        }    
    }
}

/**
 * Change the value of the different materials, boxes and batteries
 */

function changeAmound(target, name, amound){
    let store = JSON.parse(localStorage.getItem(target));
    for(let i = 0; i < store.length; i++){
        if(store[i].name == name){
            store[i].amound = amound;
            localStorage.setItem(target, JSON.stringify(store));
        }
    }
}


function createLists(item){
    let select = document.getElementById(item);
    let store = JSON.parse(localStorage.getItem(item.replace('-list', '')));
    select.innerHTML = "";
    for(let i = 0; i < store.length; i++){
        let opt = document.createElement('div');
        let imagelink = "./images/" + store[i].name.split(' ').join('_').toLowerCase()+'.webp';
        opt.innerHTML = (`<img src='${imagelink}' alt='${imagelink}'>`);
        opt.innerHTML += (`<p>${store[i].name} : ${store[i].amound}</p>`);
        select.appendChild(opt)
    }
}

function createSimList(item){
    let select = document.getElementById(item);
    let store = JSON.parse(localStorage.getItem(item.replace('-list', '')));
    for(let [key, value] of Object.entries(store)){
        let opt = document.createElement('div');
        for(let [key2, value2] of Object.entries(value)){
            opt.innerHTML += (`${key2}: ${value2}<br>`);

        }
        select.appendChild(opt)
    }
}

function createSimListNeed(item){
    let select = document.getElementById(item);
    select.innerHTML = "";
    let store = JSON.parse(localStorage.getItem(item.replace('-list', ''))); 
    for(let [key, value] of Object.entries(store[0])){
        if(key != 'level' && key != 'name'){
        let opt = document.createElement('div');
        let imagelink = "./images/" + key.split(' ').join('_').toLowerCase()+'.webp';
        opt.innerHTML = (`<img src='${imagelink}' alt='${imagelink}'>`);
            opt.innerHTML += key + ": " + value;
            select.appendChild(opt);
        }
    } 
    let opt = document.createElement('div');
    select.appendChild(opt);
    let characters = store[0].name.replace(' ', '').toLowerCase();
    let charactersrm = characters.split(',');
    let levels = store[0].level.split(',');
    for(let i = 0; i < charactersrm.length; i++){
        imagelink = "./images/simulacra/" + charactersrm[i].replace(' ', '') + '.webp';
        opt.innerHTML +=  `<img src='${imagelink}' alt='${store[0].name}'> ${levels[i]}`
        select.appendChild(opt)
    }
}

/**
 * Creates the shortage lists and starts the calculations for the amount of dimensional runs needed.
 * TODO: Refactor, single purpose function
 */

function createSimListShortage(item, times,checkDaily, checkWeekly, thisWeek){
    document.getElementById(item).innerHTML = "";
    let select = document.getElementById(item);
    let have = JSON.parse(localStorage.getItem('materials'));
    let need = JSON.parse(localStorage.getItem('goalNeeded'));
    let box = JSON.parse(localStorage.getItem('boxes'));
    for(let [key, value] of Object.entries(have)){
        for(let [key2, value2] of Object.entries(need)){
            if(value2[value.name]){
                value.amound -= value2[value.name];
            }
        }
    }

    let convert = convertMatsToHigher(have);
    have = convert;


    let boxConv = convertBoxMats(have, box);
    have = boxConv[0];
    box = boxConv[1];

    convert = convertMatsToHigher(have);
    have = convert;

    dimensionalRuns(have,box,select, times,checkDaily, checkWeekly, thisWeek);
}


/**
 * Converts your input batteries to EXP
 * TODO: Refactor from multiple check to single check.
 *       Make it future proof when new batteries get released.
 *       Add new propertie to object to fix.
 */
function convertBatteryToExp(need){
    let batteries = JSON.parse(localStorage.getItem('battery'));
    let batteriesUsed = 0;
    for(let [key, value] of Object.entries(batteries)){
        while(value.amound > 0 && need.find(o => o.name === 'exp').amound < 0){
            if(value.name == "Weapon battery I"){
                need.find(o => o.name === 'exp').amound += 20;
                value.amound -= 1;
                batteriesUsed++;
            }else
            if(value.name == "Weapon battery II"){
                need.find(o => o.name === 'exp').amound += 75;
                value.amound -= 1;
                batteriesUsed++;
            }else
            if(value.name == "Weapon battery III"){
                need.find(o => o.name === 'exp').amound += 250;
                value.amound -= 1;
                batteriesUsed++;
            }else

            if(value.name == "Weapon battery IV"){
                need.find(o => o.name === 'exp').amound += 1000;
                value.amound -= 1;
                batteriesUsed++;
            }
        }
    }
    return batteries;

}

/**
 * Starts the calculations for everything for the dimensional runs.
 * Also creates the content and HTML for the needed tab.
 * TODO: Refactor to multiple smaller functions for reusability
 */
function dimensionalRuns(have,box, select, times,checkDaily, checkWeekly, thisWeek){
    let tempArr = [];
    let char = JSON.parse(localStorage.getItem('goalNeeded'));
    let around = document.createElement('section');
    around.innerHTML = "Simulacra and level in calculation";
    let opt = document.createElement('div');
    let batteries = convertBatteryToExp(have);
    have.push(batteries[0], batteries[1], batteries[2], batteries[3])
    let tempArrSim = [];
    let tempArrLevels = [];
    for(let i = 0; i < char.length; i++){
        for(const [key, value] of Object.entries(char[i])){
            if(key == 'name'){
                let characters = value.replace(' ', '').toLowerCase();
                let charactersrm = characters.split(',');
                for(let i = 0; i < charactersrm.length; i++){
                    imagelink = "./images/simulacra/" + charactersrm[i].replace(' ', '') + '.webp';
                    tempArrSim.push(`<img src='${imagelink}' alt='${charactersrm[i]}'>`);
                }
            }
            else if(key == 'level'){
                let levels = value.split(',');
                for(let i = 0; i < levels.length; i++){
                    tempArrLevels.push(`${levels[i].replace('<div>', '')}`);
                    
                }
            }
        }
    }
    
    for(let i = 0; i < tempArrSim.length; i++){
        opt.innerHTML += `<div>${tempArrSim[i]} ${tempArrLevels[i].replace('</div>', '')}</div>`;
        around.appendChild(opt);
    }
        opt.innerHTML += "<p>Materials needed before runs: </p>";
        select.appendChild(around)
        around = document.createElement('section');
    for(const [key, value] of Object.entries(have)){
        let opt = document.createElement('div');
        let imagelink = "./images/" + value.name.split(' ').join('_').toLowerCase()+'.webp';
        opt.innerHTML += (`<img src='${imagelink}' alt='${imagelink}'>`);
        opt.innerHTML += `<p>${value.name}: ${value.amound}</p>`
        around.appendChild(opt)
        if(value.amound < 0)
            opt.className = ('low');
        if(value.amound > 0)
            opt.className = ('over');
        if(value.amound < 0){
            tempArr.push(value);
        }
        
    }
    select.appendChild(around)
    around.className = ('materials-shortage-runs');
    box = convertMatsToRuns(tempArr, box, select, times,checkDaily, checkWeekly, thisWeek);
    around = document.createElement('section');
    around.innerHTML = "Boxes left after runs:";
    around.className = "lists-content";
    around.id = "boxes-list";
    for(const [key, value] of Object.entries(box)){
        let opt = document.createElement('div');
        let imagelink = "./images/" + value.name.split(' ').join('_').toLowerCase()+'.webp';
        opt.innerHTML += (`<img src='${imagelink}' alt='${imagelink}'>`);
        opt.innerHTML += `<p>${value.name}: ${value.amound}</p>`
        around.appendChild(opt)
        if(value.amound > 0)
            opt.className = ('over');
    }
    select.appendChild(around)
}
/**
 *  Combines the materials of the same category with eachother. Calculate the runs needed.
 * TODO: Refactor to smaller functions for reusability
 *       Add new property to objects to remove most of the checks
 */
function convertMatsToRuns(have, box, select, times, checkDaily, checkWeekly, thisWeek){
    if(thisWeek == "on"){
        box[0].amound += 30;
        box[1].amound += 15;
    }
    let tempArr = [];
    let nanoAcidI = 0;
    let nanoAcidII = 0;
    let nanoAcidIII = 0;
    let boosterNanoI = 0;
    let boosterNanoII = 0;
    let boosterNanoIII = 0;
    let totalRuns = 0;
    let count = 0;
    for(const [key,value] of Object.entries(have)){
        if(value.name == "Acidproof Glaze I" || value.name == "Nano Coating I"){
            nanoAcidI += value.amound;
        }
        if(value.name == "Acidproof Glaze II" || value.name == "Nano Coating II"){
            nanoAcidII += value.amound;
        }
        if(value.name == "Acidproof Glaze III" || value.name == "Nano Coating III"){
            nanoAcidIII += value.amound;
        }
        if(value.name == "Booster Frame I" || value.name == "Nanofiber Frame I"){
            boosterNanoI += value.amound;
        }
        if(value.name == "Booster Frame II" || value.name == "Nanofiber Frame II"){
            boosterNanoII += value.amound;
        }
        if(value.name == "Booster Frame III" || value.name == "Nanofiber Frame III"){
            boosterNanoIII += value.amound;
        }
    }

    while(nanoAcidI < 0 || boosterNanoI < 0){
        if(nanoAcidI < 0 || boosterNanoI < 0){
        totalRuns++;
        if(totalRuns % times === 0 && checkDaily == "on"){
            box[1].amound+=2;
            box[0].amound+=3;
        }
        if(totalRuns % (times*7) === 0 && checkWeekly == "on"){
            box[0].amound += 30;
            box[1].amound += 15;
        }
        let remove = removeSavedBoxes(box, nanoAcidI, nanoAcidII, nanoAcidIII, boosterNanoI, boosterNanoII, boosterNanoIII);
        
        box = remove[0]
        nanoAcidI = remove[1]
        nanoAcidII = remove[2]
        nanoAcidIII = remove[3]
        boosterNanoI = remove[4]
        boosterNanoII = remove[5]
        boosterNanoIII = remove[6]
        if(nanoAcidI < 0){
            nanoAcidI += 1;
            box[2].amound++;
            if(nanoAcidI >= 0){
                box[0].amound++;
            }else{
                nanoAcidI+=1;
            }
        }else{
            box[0].amound+=2;
            box[2].amound++;
        }
        if(boosterNanoI < 0){
            boosterNanoI+=1;
            box[3].amound++;
            if(boosterNanoI >= 0){
                box[1].amound++;
            }else{
                boosterNanoI+=1;
            }
        }else{
            box[3].amound++;
            box[1].amound+=2;
        }
    }
    }

    while(nanoAcidII < 0 || boosterNanoII < 0){
        if(nanoAcidII < 0 || boosterNanoII < 0){
        totalRuns++;
        if(totalRuns % times === 0 && checkDaily == "on"){
            box[1].amound+=2;
            box[0].amound+=3;
        }
        if(totalRuns % (times*7) === 0 && checkWeekly == "on"){
            box[0].amound += 30;
            box[1].amound += 15;
        }
        let remove = removeSavedBoxes(box, nanoAcidI, nanoAcidII, nanoAcidIII, boosterNanoI, boosterNanoII, boosterNanoIII);
   
        box = remove[0]
        nanoAcidI = remove[1]
        nanoAcidII = remove[2]
        nanoAcidIII = remove[3]
        boosterNanoI = remove[4]
        boosterNanoII = remove[5]
        boosterNanoIII = remove[6]
        if(nanoAcidII < 0){
            nanoAcidII += 0.25;
            if(nanoAcidII >= 0){
                box[0].amound++;
                box[2].amound++;
                
            }else{
                nanoAcidII += 0.25;
                if(nanoAcidII >= 0){
                    box[2].amound++;
                }else{
                    nanoAcidII++;
                    while(nanoAcidII > 0){
                        nanoAcidII-=0.25;
                        box[0].amound++;
                    }
                }
            }
        }else{
            box[0].amound+=2;
            box[2].amound++;
        }
        if(boosterNanoII < 0){
            boosterNanoII += 0.25;
            if(boosterNanoII >= 0){
                box[1].amound++;
                box[3].amound++;
            }else{
                boosterNanoII += 0.25;
                if(boosterNanoII >= 0){
                    box[3].amound++;
                }else{
                    boosterNanoII++;
                    while(boosterNanoII > 0){
                        boosterNanoII-=0.25;
                        box[1].amound++;
                    }
                }
            }
        }else{
            box[1].amound+=2;
            box[3].amound++;
        }
        }
    }
    while(nanoAcidIII < 0 || boosterNanoIII < 0){
        if(nanoAcidIII < 0 || boosterNanoIII < 0){
        totalRuns++;
        if(totalRuns % times === 0 && checkDaily == "on"){
            box[1].amound+=2;
            box[0].amound+=3;
        }
        if(totalRuns % (times*7) === 0 && checkWeekly == "on"){
            box[0].amound += 30;
            box[1].amound += 15;
        }
        let remove = removeSavedBoxes(box, nanoAcidI, nanoAcidII, nanoAcidIII, boosterNanoI, boosterNanoII, boosterNanoIII);
        
        box = remove[0]
        nanoAcidI = remove[1]
        nanoAcidII = remove[2]
        nanoAcidIII = remove[3]
        boosterNanoI = remove[4]
        boosterNanoII = remove[5]
        boosterNanoIII = remove[6]
        if(nanoAcidIII < 0){
            nanoAcidIII += 0.0625;
            if(nanoAcidIII >= 0){
                box[0].amound++;
                box[2].amound++;
            }else{
                nanoAcidIII += 0.0625;
                if(nanoAcidIII >= 0){
                    box[2].amound++;
                }else{
                    nanoAcidIII+= 0.25;
                    while(nanoAcidIII > 0){
                        nanoAcidIII-=0.0625;
                        box[0].amound++;
                    }
                }
            }
        }else{
            box[0].amound+=2;
            box[2].amound++;
        }
        if(boosterNanoIII < 0){
            boosterNanoIII += 0.0625;
            if(boosterNanoIII >= 0){
                box[1].amound++;
                box[3].amound++;
            }else{
                boosterNanoIII += 0.0625;
                if(boosterNanoIII >= 0){
                    box[3].amound++;
                }else{    
                    boosterNanoIII += 0.25;
                    while(boosterNanoIII > 0){
                        boosterNanoIII -= 0.0625;
                        box[1].amound++;
                        
                    }
                }
            }
        }else{
            box[1].amound+=2;
            box[3].amound++;
        }
        }
    }

    document.getElementById('runs-needed').innerHTML = "Days runs needed: ";
    document.getElementById('runs-needed').innerHTML += Math.ceil(totalRuns/times);
    return box;
}
/**
 * Unpacks saved boxes to needed materials
 * TODO: Refactor to less if statements. 
 */
function removeSavedBoxes(box, nanoAcidI, nanoAcidII, nanoAcidIII, boosterNanoI, boosterNanoII, boosterNanoIII){
    while(
    (box[0].amound > 0 && (nanoAcidI < 0 || nanoAcidII < 0 || nanoAcidIII < 0 )) ||
    (box[2].amound > 0 && (nanoAcidII < 0 || nanoAcidIII < 0 )) ||
    (box[1].amound > 0 && (boosterNanoI < 0 || boosterNanoII < 0 || boosterNanoIII < 0)) || 
    (box[3].amound > 0 && (boosterNanoII < 0 || boosterNanoIII < 0))
    ){
        if(box[0].amound > 0 && nanoAcidI < 0){
            box[0].amound--;
            nanoAcidI++;
        }else
        if(box[0].amound > 0 && (nanoAcidII < 0 && nanoAcidI >= 0)){
            box[0].amound--;
            nanoAcidII+=0.25;
        }else
        if(box[0].amound > 0 && (nanoAcidI >= 0 && nanoAcidII >= 0 && nanoAcidIII < 0)){
            box[0].amound--;
            nanoAcidIII+=0.0625;
        }else
        if(box[2].amound > 0 && nanoAcidII < 0){
            box[2].amound--;
            nanoAcidII++;
        }else
        if(box[2].amound > 0 && (nanoAcidIII < 0 && nanoAcidII >= 0)){
            box[2].amound--;
            nanoAcidIII += 0.25;
        }

        if(box[1].amound > 0 && boosterNanoI < 0){
            box[1].amound--;
            boosterNanoI++;
        }else
        if(box[1].amound > 0 && (boosterNanoII < 0 && boosterNanoI >= 0)){
            box[1].amound--;
            boosterNanoII+=0.25;
        }else
        if(box[1].amound > 0 && (boosterNanoIII < 0 && boosterNanoI >= 0 && boosterNanoII >= 0)){
            box[1].amound--;
            boosterNanoIII+=0.0625;
        }else
        if(box[3].amound > 0 && boosterNanoII < 0){
            box[3].amound--;
            boosterNanoII++;
        }else
        if(box[3].amound > 0 && (boosterNanoIII < 0 && boosterNanoII >= 0)){
            box[3].amound--;
            boosterNanoIII += 0.25;
        }
    }
    return [box, nanoAcidI, nanoAcidII, nanoAcidIII, boosterNanoI, boosterNanoII, boosterNanoIII]
}

function convertBoxMats(have, box){
    for(let i = box.length-1; i >= 0; i--){
        for(let y = have.length-1; y >= 0; y--){
            if(have[y].amound < 4 && box[i].amound > 0){
                let convBox;
                if(have[y+1] != undefined && !have[y].name.includes("III") && have[y].name.includes(" I")){
                    
                    convBox = convertBox(have[y], have[y+1], box[i]);
                }else{
                    convBox = convertBox(have[y], {amound:0}, box[i]);
                }
                if(convBox != undefined){
                    have[y] = convBox[0];
                    box[i] = convBox[1];
                }
            }
        }
    }
    return [have, box];
}

function convertBox(have, next, box){
    if(box.name == "Weapon Augmentation Box IV"){
        if(have.amound < 0 && (have.name == "Nanofiber Frame II" || 
        have.name == "Booster Frame II")){
            while(have.amound < 0 && box.amound > 0){
                box.amound--;
                have.amound++;
            }
            return [have, box];
        }else if(have.amound < 0 && (have.name == "Nanofiber Frame III" ||
        have.name == "Booster Frame III")){
            let conv = convertMats(box.amound, have.amound);
            have.amound = conv[1];
            box.amound = conv[0];
            return[have, box];
        }
    }
    if(box.name == "Weapon Augmentation Box III"){
        if(have.amound < 0 && (have.name == "Nano Coating II" || 
        have.name == "Acidproof Glaze II")){
            while(have.amound < 0 && box.amound > 0){
                box.amound--;
                have.amound++;
            }
            return [have, box];
        }else if(have.amound < 0 && (have.name == "Nano Coating III" ||
        have.name == "Acidproof Glaze III")){
            let conv = convertMats(box.amound, have.amound);
            have.amound = conv[1];
            box.amound = conv[0];
            return[have, box];
        }
    }
    if(box.name == "Weapon Augmentation Box II"){
        if(have.amound < 0 && (have.name == "Nanofiber Frame I" || 
        have.name == "Booster Frame I")){
            while(have.amound < 0 && box.amound > 0){
                box.amound--;
                have.amound++;
            }
            return [have, box];
        }else if(have.amound < 0 && (have.name == "Nanofiber Frame II" ||
        have.name == "Booster Frame II")){
            let conv = convertMats(box.amound, have.amound);
            have.amound = conv[1];
            box.amound = conv[0];
            return[have, box];
        }else if(have.amound < 0 && (have.name == "Nanofiber Frame III" ||
        have.name == "Booster Frame III")){
            let conv = convertMatsL3(box.amound, have.amound);
            have.amound = conv[1];
            box.amound = conv[0];
            return [have, box]
        }
    }
    if(box.name == "Weapon Augmentation Box I"){
        if(have.amound < 0 && (have.name == "Nano Coating I" || 
        have.name == "Acidproof Glaze I")){
            while(have.amound < 0 && box.amound > 0){
                box.amound--;
                have.amound++;
            }
            return [have, box];
        }else if((have.amound < 4 && next.amound < 0) && (have.name == "Nano Coating I" || 
        have.name == "Acidproof Glaze I")){
            while(have.amound < 4 && box.amound > 0){
                box.amound--;
                have.amound++;
            }
            return [have, box];
        }else if(have.amound < 0 && (have.name == "Nano Coating II" ||
        have.name == "Acidproof Glaze II")){
            let conv = convertMats(box.amound, have.amound);
            have.amound = conv[1];
            box.amound = conv[0];
            return [have, box]
        }else if(have.amound < 0 && (have.name == "Nano Coating III" ||
        have.name == "Acidproof Glaze III")){
            let conv = convertMatsL3(box.amound, have.amound);
            have.amound = conv[1];
            box.amound = conv[0];
            return [have, box]
        }
    }
    if(box.name == "Weapon Augmentation Kit Box I"){
        if(have.amound < 0 && (have.name == "Nanofiber Frame I" || 
        have.name == "Booster Frame I" || have.name == "Nano Coating I" || 
        have.name == "Acidproof Glaze I")){
            while(have.amound < 0 && box.amound > 0){
                box.amound--;
                have.amound++;
            }
            return [have, box];
        }else if((have.amound < 4 && next.amound < 0)&& (have.name == "Nanofiber Frame I" || 
        have.name == "Booster Frame I" || have.name == "Nano Coating I" || 
        have.name == "Acidproof Glaze I")){
            while(have.amound < 0 && box.amound > 0){
                box.amound--;
                have.amound++;
            }
            return [have, box];

        }else if(have.amound < 0 && (have.name == "Nanofiber Frame II" ||
        have.name == "Booster Frame II" || have.name == "Nano Coating II" ||
        have.name == "Acidproof Glaze II")){
            let conv = convertMats(box.amound, have.amound);
            have.amound = conv[1];
            box.amound = conv[0];
            return [have, box]
        }else if(have.amound < 0 && (have.name == "Nanofiber Frame III" ||
        have.name == "Booster Frame III" || have.name == "Nano Coating III" ||
        have.name == "Acidproof Glaze III")){
            let conv = convertMatsL3(box.amound, have.amound);
            have.amound = conv[1];
            box.amound = conv[0];
            return [have, box]
        }
    }
}

function convertMatsToHigher(have){
    for(let i = have.length-1; i >= 0; i--){
        if(have[i].amound < 0 && i != 0 && have[i-1].amound >= 4 && have[i].name.includes(have[i-1].name)){
            let conv = convertMats(have[i-1].amound, have[i].amound);
            have[i-1].amound = conv[0];
            have[i].amound = conv[1];
        }
    }
    return have;
}


function convertMatsL3(boxes, need){
    while(boxes >= 16 && need < 0){
        boxes -= 16;
        need++;
    }
    return [boxes, need]
}

function convertMats(have, need){
    while(have >= 4 && need < 0){
        have -= 4;
        need++;
    }
    return [have, need]
}

function createSimListCalcChar(item){
    let select = document.getElementById(item);
    let store = JSON.parse(localStorage.getItem(item.replace('-name', '')));
    let old = "";
    let counter = 0;
    for(let i = 0; i < store.length; i++){
        if(!old.includes(store[i].name)){
            let opt = document.createElement('option');
            opt.value = store[i].name;
            opt.innerHTML = store[i].name;
            select.appendChild(opt)
            old += store[i].name
        }
    }
}


function createSimListCalcLevel(item){
    let select = document.getElementsByClassName(item);
    let store = JSON.parse(localStorage.getItem(item.replace('-level', '')));
    for(let i = 0; i < store.length-(store.length-store.length/Number(localStorage.getItem('numberOfCharacters'))); i++){
        
        for(let j = 0; j < select.length; j++){
            let opt = document.createElement('option');
            opt.value = store[i].level;
            if(j == 1){
                opt.innerHTML = store[i].level+10;
            }else{
                opt.innerHTML = store[i].level;
            }
            if(j == 1 && i == store.length-(store.length-store.length/Number(localStorage.getItem('numberOfCharacters')))-1){
                opt.selected = true;
            }
            select[j].appendChild(opt);
        }
    }
}

function addTextBox(e){
    let select = document.getElementById(e.target.classList[0]);
    let opt = document.createElement('select');
    opt.name='material';
    opt.className = 'materials-select';
    select.appendChild(opt)
    let opt2 = document.createElement('input');
    opt2.type='number'
    opt2.name='amound'
    select.appendChild(opt2)
    createOptionsMaterials('materials-select')
}

function clearGoal(){
    if(confirm("Are you sure you want to clear the goal?")){
        localStorage.removeItem('goalNeeded');
        localStorage.removeItem('needed');
        document.getElementById('goalNeeded-list').innerHTML = "";
        document.getElementById('shortage-list').innerHTML = "";
        document.getElementById('goalNeeded-content').style.display = 'none';
        document.getElementById('shortage-content').style.display = 'none';
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
    document.getElementById("mySidenav").style.padding = "60px 0 0 0";
  }

var acc = document.getElementsByClassName("accordion");
for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "grid") {
        panel.style.display = "none";
      } else {
        panel.style.display = "grid";
      }
    });
  }

let isMobile = window.matchMedia("only screen and (max-width: 480px)").matches;
if(isMobile){
  var acc = document.getElementsByClassName("mobile-form");
  for (let i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      for(let y = 0; y < acc.length; y++){
        if(acc[y].classList[1] == 'active'){
            acc[y].classList.remove('active')
            acc[y].nextElementSibling.style.height = "0px";
            acc[y].nextElementSibling.style.visibility = "hidden";
            acc[y].nextElementSibling.style.opacity = "0";
            acc[y].nextElementSibling.style.padding = "0";
        }
      }
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (window.getComputedStyle(panel, null).height > 0) {
        panel.style.height = "0px";
        panel.style.visibility = "hidden";
        panel.style.opacity = "0";
        panel.style.padding = "0";
      } else {
        panel.style.height = "auto";
        panel.style.visibility = "visible";
        panel.style.opacity = "1";
        panel.style.padding = "10px"
      }
    });
  }
}

function feedback(target){
  let text;
  let panel = document.getElementById('feedback-tab');
  let warningTab = document.getElementById('warning-tab');
  let warning = false;
  switch(target){
      case "calc-amound-runs":
          text = "Runs have been calculated."
      break;
      case "needed":
          text = "Simulacra has been added to goal.";
      break;
      case "change-amound-materials":
          text = "Materials have been updated.";
      break;
      case "change-amound-boxes":
          text = "Boxes have been updated.";
      break;
      case "change-amound-matrix":
          text = "Boxes have been updated.";
      break;
      case "change-amound-matrice":
          text = "Boxes have been updated.";
      break;
      case "change-amound-batteries":
          text = "Boxes have been updated.";
      break;
      case "addDimensional":
          text = "Dimensional runs added.";
      break;
      case "save":
        text = "Back-up made.";
      break;
      case "upload":
        text = "Materials, boxes and batteries uploaded.";
      break;
      case "upload-fail":
        text = "JSON file only! Make sure its the backup file.";
        warning = true;
      break;
  }
  if(!warning){
    panel.innerHTML = text;
    panel.style.height = "auto";
    panel.style.visibility = "visible";
    panel.style.opacity = "0.8";
    panel.style.padding = "10px"
    setTimeout(function(){
        panel.style.height = "0px";
        panel.style.visibility = "hidden";
        panel.style.opacity = "0";
        panel.style.padding = "0";}, 1000);
  }else{
    // panel.style.backgroundColor = "maroon";
    warningTab.innerHTML = text;
    warningTab.style.height = "auto";
    warningTab.style.visibility = "visible";
    warningTab.style.opacity = "0.8";
    warningTab.style.padding = "10px"
    setTimeout(function(){
      warningTab.style.height = "0px";
      warningTab.style.visibility = "hidden";
      warningTab.style.opacity = "0";
      warningTab.style.padding = "0";}, 2000);
  }

}

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
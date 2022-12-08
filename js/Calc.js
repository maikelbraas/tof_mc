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
                        console.log(amound[key]);
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
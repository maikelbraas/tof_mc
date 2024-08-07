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
function init(){
    if(localStorage.getItem('materials') == null){
        localStorage.setItem('materials', 
        JSON.stringify([new Material('Nano Coating I', 0), 
        new Material('Nano Coating II', 0), 
        new Material('Nano Coating III', 0),
        new Material('Acidproof Glaze I', 0),
        new Material('Acidproof Glaze II', 0),
        new Material('Acidproof Glaze III', 0),
        new Material('Nanofiber Frame I', 0),
        new Material('Nanofiber Frame II', 0),
        new Material('Nanofiber Frame III', 0),
        new Material('Booster Frame I', 0),
        new Material('Booster Frame II', 0),
        new Material('Booster Frame III', 0),
        new Material('Magcore', 0),
        new Material('Heart of lightning', 0),
        new Material('Lightningsource', 0),
        new Material('Rockcore', 0),
        new Material('Heart of summit', 0),
        new Material('Landsource', 0),
        new Material('Icecore', 0),
        new Material('Heart of winter', 0),
        new Material('Snowsource', 0),
        new Material('Firecore', 0),
        new Material('Heart of lava', 0),
        new Material('Sunsource', 0),
        new Material('gold', 0),
        new Material('exp', 0)]));
    }

    if(localStorage.getItem('battery') == null){
        localStorage.setItem('battery', JSON.stringify([
            new Material('Weapon battery I', 0),
            new Material('Weapon battery II', 0),
            new Material('Weapon battery III', 0),
            new Material('Weapon battery IV', 0),
        ]))
    }

    if(localStorage.getItem('matrixPack') == null){
        localStorage.setItem('matrixPack', JSON.stringify([
            new Material('Matrix data pack I', 0),
            new Material('Matrix data pack II', 0),
            new Material('Matrix data pack III', 0),
            new Material('Matrix data pack IV', 0),
        ]))
    }

    if(localStorage.getItem('matrice') == null){
            localStorage.setItem('matrice', JSON.stringify([
                new Material('Matrice blue', 0),
                new Material('Matrice purple', 0),
                new Material('Matrice yellow', 0),
            ]))
    }
    
    if(localStorage.getItem('boxes') == null){
        localStorage.setItem('boxes',JSON.stringify([
        new Material('Weapon Augmentation Box I', 0),
        new Material('Weapon Augmentation Box II', 0),
        new Material('Weapon Augmentation Box III', 0),
        new Material('Weapon Augmentation Box IV', 0),
        new Material('Weapon Augmentation Kit Box I', 0)
        ]))
    }
    localStorage.setItem('simulacrum', JSON.stringify([
            {name : 'Alyss', level : 0, gold : 0, exp : 400},
            {name : 'Alyss', level : 10, gold: 400, exp : 600, Icecore : 2},
            {name : 'Alyss', level : 20, gold : 800, exp : 900, Icecore : 2},
            {name : 'Alyss', level : 30, gold : 1200, exp : 1200, Icecore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Alyss', level : 40, gold : 1600, exp : 1700, 'Icecore' : 3, 'Acidproof Glaze I' : 3, 'Booster Frame I' : 3},
            {name : 'Alyss', level : 50, gold : 2000, exp : 2200, 'Icecore' : 4, 'Acidproof Glaze I' : 4, 'Booster Frame I' : 4},
            {name : 'Alyss', level : 60, gold : 2400, exp : 2900, 'Icecore' : 6, 'Acidproof Glaze I' : 6, 'Booster Frame I' : 6},
            {name : 'Alyss', level : 70, gold : 2800, exp : 3900, 'Icecore' : 8, 'Acidproof Glaze I' : 8, 'Booster Frame I' : 8},
            {name : 'Alyss', level : 80, gold : 3200, exp : 5000, 'Icecore' : 11, 'Acidproof Glaze I' : 11, 'Booster Frame I' : 11},
            {name : 'Alyss', level : 90, gold : 3600, exp : 5800, 'Heart of winter' : 5, 'Acidproof Glaze II' : 5, 'Booster Frame II' : 5},
            {name : 'Alyss', level : 100, gold : 4000, exp : 6400, 'Heart of winter' : 6, 'Acidproof Glaze II' : 6, 'Booster Frame II' : 6},
            {name : 'Alyss', level : 110, gold : 4400, exp : 7100, 'Heart of winter' : 8, 'Acidproof Glaze II' : 8, 'Booster Frame II' : 8},
            {name : 'Alyss', level : 120, gold : 4800, exp : 7600, 'Heart of winter' : 11, 'Acidproof Glaze II' : 11, 'Booster Frame II' : 11},
            {name : 'Alyss', level : 130, gold : 5200, exp : 8000, 'Heart of winter' : 15, 'Acidproof Glaze II' : 15, 'Booster Frame II' : 15},
            {name : 'Alyss', level : 140, gold : 5600, exp : 8500, 'Heart of winter' : 20, 'Acidproof Glaze II' : 20, 'Booster Frame II' : 20},
            {name : 'Alyss', level : 150, gold : 6000, exp : 0, 'Snowsource' : 5, 'Acidproof Glaze III' : 5, 'Booster Frame III' : 5},
            {name : 'Alyss', level : 160, gold : 6400, exp : 0, 'Snowsource' : 5, 'Acidproof Glaze III' : 5, 'Booster Frame III' : 5},


            {name : 'Annabella', level : 0, gold : 0, exp : 400},
            {name : 'Annabella', level : 10, gold: 400, exp : 600, Firecore : 2},
            {name : 'Annabella', level : 20, gold : 800, exp : 900, Firecore : 2},
            {name : 'Annabella', level : 30, gold : 1200, exp : 1200, Firecore : 3, 'Nano Coating I' : 3},
            {name : 'Annabella', level : 40, gold : 1600, exp : 1700, 'Firecore' : 3, 'Nano Coating I' : 3, 'Booster Frame I' : 3},
            {name : 'Annabella', level : 50, gold : 2000, exp : 2200, 'Firecore' : 4, 'Nano Coating I' : 4, 'Booster Frame I' : 4},
            {name : 'Annabella', level : 60, gold : 2400, exp : 2900, 'Firecore' : 6, 'Nano Coating I' : 6, 'Booster Frame I' : 6},
            {name : 'Annabella', level : 70, gold : 2800, exp : 3900, 'Firecore' : 8, 'Nano Coating I' : 8, 'Booster Frame I' : 8},
            {name : 'Annabella', level : 80, gold : 3200, exp : 5000, 'Firecore' : 11, 'Nano Coating I' : 11, 'Booster Frame I' : 11},
            {name : 'Annabella', level : 90, gold : 3600, exp : 5800, 'Heart of lava' : 5, 'Nano Coating II' : 5, 'Booster Frame II' : 5},
            {name : 'Annabella', level : 100, gold : 4000, exp : 6400, 'Heart of lava' : 6, 'Nano Coating II' : 6, 'Booster Frame II' : 6},
            {name : 'Annabella', level : 110, gold : 4400, exp : 7100, 'Heart of lava' : 8, 'Nano Coating II' : 8, 'Booster Frame II' : 8},
            {name : 'Annabella', level : 120, gold : 4800, exp : 7600, 'Heart of lava' : 11, 'Nano Coating II' : 11, 'Booster Frame II' : 11},
            {name : 'Annabella', level : 130, gold : 5200, exp : 8000, 'Heart of lava' : 15, 'Nano Coating II' : 15, 'Booster Frame II' : 15},
            {name : 'Annabella', level : 140, gold : 5600, exp : 8500, 'Heart of lava' : 20, 'Nano Coating II' : 20, 'Booster Frame II' : 20},
            {name : 'Annabella', level : 150, gold : 6000, exp : 0, 'Sunsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            {name : 'Annabella', level : 160, gold : 6400, exp : 0, 'Sunsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            
            {name : 'Claudia', level : 0, gold : 0, exp : 400},
            {name : 'Claudia', level : 10, gold : 400, exp : 600, 'Rockcore' : 2},
            {name : 'Claudia', level : 20, gold : 800, exp : 900, 'Rockcore' : 2},
            {name : 'Claudia', level : 30, gold : 1200, exp : 1200, 'Rockcore' : 3, 'Nano Coating I' : 3},
            {name : 'Claudia', level : 40, gold : 1600, exp : 1700, 'Rockcore' : 3, 'Nano Coating I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Claudia', level : 50, gold : 2000, exp : 2200, 'Rockcore' : 4, 'Nano Coating I': 4, 'Nanofiber Frame I' : 4},
            {name : 'Claudia', level : 60, gold : 2400, exp : 2900, 'Rockcore' : 6, 'Nano Coating I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Claudia', level : 70, gold : 2800, exp : 3900, 'Rockcore' : 8, 'Nano Coating I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Claudia', level : 80, gold : 3200, exp : 5000, 'Rockcore' : 11, 'Nano Coating I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Claudia', level : 90, gold : 3600, exp : 5800, 'Heart of summit' : 5, 'Nano Coating II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Claudia', level : 100, gold : 4000, exp : 6400, 'Heart of summit' : 6, 'Nano Coating II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Claudia', level : 110, gold : 4400, exp : 7100, 'Heart of summit' : 8, 'Nano Coating II' :  8, 'Nanofiber Frame II' : 8},
            {name : 'Claudia', level : 120, gold : 4800, exp : 7600, 'Heart of summit' : 11, 'Nano Coating II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Claudia', level : 130, gold : 5200, exp : 8000, 'Heart of summit' : 15, 'Nano Coating II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Claudia', level : 140, gold : 5600, exp : 8500, 'Heart of summit' : 20, 'Nano Coating II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Claudia', level : 150, gold : 6000, exp : 0, 'Landsource' : 5, 'Nano Coating III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Claudia', level : 160, gold : 6400, exp : 0, 'Landsource' : 5, 'Nano Coating III' : 5, 'Nanofiber Frame III' : 5},
            
            {name : 'Cobalt-B', level : 0, gold : 0, exp : 400},
            {name : 'Cobalt-B', level : 10, gold: 400, exp : 600, Firecore : 2},
            {name : 'Cobalt-B', level : 20, gold : 800, exp : 900, Firecore : 2},
            {name : 'Cobalt-B', level : 30, gold : 1200, exp : 1200, Firecore : 3, 'Nano Coating I' : 3},
            {name : 'Cobalt-B', level : 40, gold : 1600, exp : 1700, 'Firecore' : 3, 'Nano Coating I' : 3, 'Booster Frame I' : 3},
            {name : 'Cobalt-B', level : 50, gold : 2000, exp : 2200, 'Firecore' : 4, 'Nano Coating I' : 4, 'Booster Frame I' : 4},
            {name : 'Cobalt-B', level : 60, gold : 2400, exp : 2900, 'Firecore' : 6, 'Nano Coating I' : 6, 'Booster Frame I' : 6},
            {name : 'Cobalt-B', level : 70, gold : 2800, exp : 3900, 'Firecore' : 8, 'Nano Coating I' : 8, 'Booster Frame I' : 8},
            {name : 'Cobalt-B', level : 80, gold : 3200, exp : 5000, 'Firecore' : 11, 'Nano Coating I' : 11, 'Booster Frame I' : 11},
            {name : 'Cobalt-B', level : 90, gold : 3600, exp : 5800, 'Heart of lava' : 5, 'Nano Coating II' : 5, 'Booster Frame II' : 5},
            {name : 'Cobalt-B', level : 100, gold : 4000, exp : 6400, 'Heart of lava' : 6, 'Nano Coating II' : 6, 'Booster Frame II' : 6},
            {name : 'Cobalt-B', level : 110, gold : 4400, exp : 7100, 'Heart of lava' : 8, 'Nano Coating II' : 8, 'Booster Frame II' : 8},
            {name : 'Cobalt-B', level : 120, gold : 4800, exp : 7600, 'Heart of lava' : 11, 'Nano Coating II' : 11, 'Booster Frame II' : 11},
            {name : 'Cobalt-B', level : 130, gold : 5200, exp : 8000, 'Heart of lava' : 15, 'Nano Coating II' : 15, 'Booster Frame II' : 15},
            {name : 'Cobalt-B', level : 140, gold : 5600, exp : 8500, 'Heart of lava' : 20, 'Nano Coating II' : 20, 'Booster Frame II' : 20},
            {name : 'Cobalt-B', level : 150, gold : 6000, exp : 0, 'Sunsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            {name : 'Cobalt-B', level : 160, gold : 6400, exp : 0, 'Sunsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            
            {name : 'Coco Ritter', level : 0, gold : 0, exp : 400},
            {name : 'Coco Ritter', level : 10, gold: 400, exp : 600, Icecore : 2},
            {name : 'Coco Ritter', level : 20, gold : 800, exp : 900, Icecore : 2},
            {name : 'Coco Ritter', level : 30, gold : 1200, exp : 1200, Icecore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Coco Ritter', level : 40, gold : 1600, exp : 1700, 'Icecore' : 3, 'Acidproof Glaze I' : 3, 'Booster Frame I' : 3},
            {name : 'Coco Ritter', level : 50, gold : 2000, exp : 2200, 'Icecore' : 4, 'Acidproof Glaze I' : 4, 'Booster Frame I' : 4},
            {name : 'Coco Ritter', level : 60, gold : 2400, exp : 2900, 'Icecore' : 6, 'Acidproof Glaze I' : 6, 'Booster Frame I' : 6},
            {name : 'Coco Ritter', level : 70, gold : 2800, exp : 3900, 'Icecore' : 8, 'Acidproof Glaze I' : 8, 'Booster Frame I' : 8},
            {name : 'Coco Ritter', level : 80, gold : 3200, exp : 5000, 'Icecore' : 11, 'Acidproof Glaze I' : 11, 'Booster Frame I' : 11},
            {name : 'Coco Ritter', level : 90, gold : 3600, exp : 5800, 'Heart of winter' : 5, 'Acidproof Glaze II' : 5, 'Booster Frame II' : 5},
            {name : 'Coco Ritter', level : 100, gold : 4000, exp : 6400, 'Heart of winter' : 6, 'Acidproof Glaze II' : 6, 'Booster Frame II' : 6},
            {name : 'Coco Ritter', level : 110, gold : 4400, exp : 7100, 'Heart of winter' : 8, 'Acidproof Glaze II' : 8, 'Booster Frame II' : 8},
            {name : 'Coco Ritter', level : 120, gold : 4800, exp : 7600, 'Heart of winter' : 11, 'Acidproof Glaze II' : 11, 'Booster Frame II' : 11},
            {name : 'Coco Ritter', level : 130, gold : 5200, exp : 8000, 'Heart of winter' : 15, 'Acidproof Glaze II' : 15, 'Booster Frame II' : 15},
            {name : 'Coco Ritter', level : 140, gold : 5600, exp : 8500, 'Heart of winter' : 20, 'Acidproof Glaze II' : 20, 'Booster Frame II' : 20},
            {name : 'Coco Ritter', level : 150, gold : 6000, exp : 0, 'Snowsource' : 5, 'Acidproof Glaze III' : 5, 'Booster Frame III' : 5},
            {name : 'Coco Ritter', level : 160, gold : 6400, exp : 0, 'Snowsource' : 5, 'Acidproof Glaze III' : 5, 'Booster Frame III' : 5},
            
            {name : 'Crow', level : 0, gold : 0, exp : 400},
            {name : 'Crow', level : 10, gold : 400, exp : 600, 'Magcore' : 2},
            {name : 'Crow', level : 20, gold : 800, exp : 900, 'Magcore' : 2},
            {name : 'Crow', level : 30, gold : 1200, exp : 1200, 'Magcore' : 3, 'Nano Coating I' : 3},
            {name : 'Crow', level : 40, gold : 1600, exp : 1700, 'Magcore' : 3, 'Nano Coating I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Crow', level : 50, gold : 2000, exp : 2200, 'Magcore' : 4, 'Nano Coating I': 4, 'Nanofiber Frame I' : 4},
            {name : 'Crow', level : 60, gold : 2400, exp : 2900, 'Magcore' : 6, 'Nano Coating I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Crow', level : 70, gold : 2800, exp : 3900, 'Magcore' : 8, 'Nano Coating I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Crow', level : 80, gold : 3200, exp : 5000, 'Magcore' : 11, 'Nano Coating I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Crow', level : 90, gold : 3600, exp : 5800, 'Heart of lightning' : 5, 'Nano Coating II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Crow', level : 100, gold : 4000, exp : 6400, 'Heart of lightning' : 6, 'Nano Coating II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Crow', level : 110, gold : 4400, exp : 7100, 'Heart of lightning' : 8, 'Nano Coating II' :  8, 'Nanofiber Frame II' : 8},
            {name : 'Crow', level : 120, gold : 4800, exp : 7600, 'Heart of lightning' : 11, 'Nano Coating II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Crow', level : 130, gold : 5200, exp : 8000, 'Heart of lightning' : 15, 'Nano Coating II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Crow', level : 140, gold : 5600, exp : 8500, 'Heart of lightning' : 20, 'Nano Coating II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Crow', level : 150, gold : 6000, exp : 0, 'Lightningsource' : 5, 'Nano Coating III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Crow', level : 160, gold : 6400, exp : 0, 'Lightningsource' : 5, 'Nano Coating III' : 5, 'Nanofiber Frame III' : 5},

            {name : 'Fenrir', level : 0, gold : 0, exp : 400},
            {name : 'Fenrir', level : 10, gold: 400, exp : 600, Magcore : 2},
            {name : 'Fenrir', level : 20, gold : 800, exp : 900, Magcore : 2},
            {name : 'Fenrir', level : 30, gold : 1200, exp : 1200, Magcore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Fenrir', level : 40, gold : 1600, exp : 1700, 'Magcore' : 3, 'Acidproof Glaze I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Fenrir', level : 50, gold : 2000, exp : 2200, 'Magcore' : 4, 'Acidproof Glaze I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'Fenrir', level : 60, gold : 2400, exp : 2900, 'Magcore' : 6, 'Acidproof Glaze I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Fenrir', level : 70, gold : 2800, exp : 3900, 'Magcore' : 8, 'Acidproof Glaze I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Fenrir', level : 80, gold : 3200, exp : 5000, 'Magcore' : 11, 'Acidproof Glaze I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Fenrir', level : 90, gold : 3600, exp : 5800, 'Heart of lightning' : 5, 'Acidproof Glaze II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Fenrir', level : 100, gold : 4000, exp : 6400, 'Heart of lightning' : 6, 'Acidproof Glaze II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Fenrir', level : 110, gold : 4400, exp : 7100, 'Heart of lightning' : 8, 'Acidproof Glaze II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'Fenrir', level : 120, gold : 4800, exp : 7600, 'Heart of lightning' : 11, 'Acidproof Glaze II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Fenrir', level : 130, gold : 5200, exp : 8000, 'Heart of lightning' : 15, 'Acidproof Glaze II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Fenrir', level : 140, gold : 5600, exp : 8500, 'Heart of lightning' : 20, 'Acidproof Glaze II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Fenrir', level : 150, gold : 6000, exp : 0, 'Lightningsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Fenrir', level : 160, gold : 6400, exp : 0, 'Lightningsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},

            {name : 'Frigg', level : 0, gold : 0, exp : 400},
            {name : 'Frigg', level : 10, gold: 400, exp : 600, Icecore : 2},
            {name : 'Frigg', level : 20, gold : 800, exp : 900, Icecore : 2},
            {name : 'Frigg', level : 30, gold : 1200, exp : 1200, Icecore : 3, 'Nano Coating I' : 3},
            {name : 'Frigg', level : 40, gold : 1600, exp : 1700, 'Icecore' : 3, 'Nano Coating I' : 3, 'Booster Frame I' : 3},
            {name : 'Frigg', level : 50, gold : 2000, exp : 2200, 'Icecore' : 4, 'Nano Coating I' : 4, 'Booster Frame I' : 4},
            {name : 'Frigg', level : 60, gold : 2400, exp : 2900, 'Icecore' : 6, 'Nano Coating I' : 6, 'Booster Frame I' : 6},
            {name : 'Frigg', level : 70, gold : 2800, exp : 3900, 'Icecore' : 8, 'Nano Coating I' : 8, 'Booster Frame I' : 8},
            {name : 'Frigg', level : 80, gold : 3200, exp : 5000, 'Icecore' : 11, 'Nano Coating I' : 11, 'Booster Frame I' : 11},
            {name : 'Frigg', level : 90, gold : 3600, exp : 5800, 'Heart of winter' : 5, 'Nano Coating II' : 5, 'Booster Frame II' : 5},
            {name : 'Frigg', level : 100, gold : 4000, exp : 6400, 'Heart of winter' : 6, 'Nano Coating II' : 6, 'Booster Frame II' : 6},
            {name : 'Frigg', level : 110, gold : 4400, exp : 7100, 'Heart of winter' : 8, 'Nano Coating II' : 8, 'Booster Frame II' : 8},
            {name : 'Frigg', level : 120, gold : 4800, exp : 7600, 'Heart of winter' : 11, 'Nano Coating II' : 11, 'Booster Frame II' : 11},
            {name : 'Frigg', level : 130, gold : 5200, exp : 8000, 'Heart of winter' : 15, 'Nano Coating II' : 15, 'Booster Frame II' : 15},
            {name : 'Frigg', level : 140, gold : 5600, exp : 8500, 'Heart of winter' : 20, 'Nano Coating II' : 20, 'Booster Frame II' : 20},
            {name : 'Frigg', level : 150, gold : 6000, exp : 0, 'Snowsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            {name : 'Frigg', level : 160, gold : 6400, exp : 0, 'Snowsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            
            {name : 'Huma', level : 0, gold : 0, exp : 400},
            {name : 'Huma', level : 10, gold: 400, exp : 600, Firecore : 2},
            {name : 'Huma', level : 20, gold : 800, exp : 900, Firecore : 2},
            {name : 'Huma', level : 30, gold : 1200, exp : 1200, Firecore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Huma', level : 40, gold : 1600, exp : 1700, 'Firecore' : 3, 'Acidproof Glaze I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Huma', level : 50, gold : 2000, exp : 2200, 'Firecore' : 4, 'Acidproof Glaze I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'Huma', level : 60, gold : 2400, exp : 2900, 'Firecore' : 6, 'Acidproof Glaze I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Huma', level : 70, gold : 2800, exp : 3900, 'Firecore' : 8, 'Acidproof Glaze I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Huma', level : 80, gold : 3200, exp : 5000, 'Firecore' : 11, 'Acidproof Glaze I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Huma', level : 90, gold : 3600, exp : 5800, 'Heart of lava' : 5, 'Acidproof Glaze II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Huma', level : 100, gold : 4000, exp : 6400, 'Heart of lava' : 6, 'Acidproof Glaze II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Huma', level : 110, gold : 4400, exp : 7100, 'Heart of lava' : 8, 'Acidproof Glaze II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'Huma', level : 120, gold : 4800, exp : 7600, 'Heart of lava' : 11, 'Acidproof Glaze II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Huma', level : 130, gold : 5200, exp : 8000, 'Heart of lava' : 15, 'Acidproof Glaze II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Huma', level : 140, gold : 5600, exp : 8500, 'Heart of lava' : 20, 'Acidproof Glaze II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Huma', level : 150, gold : 6000, exp : 0, 'Sunsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Huma', level : 160, gold : 6400, exp : 0, 'Sunsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
             
            {name : 'King', level : 0, gold : 0, exp : 400},
            {name : 'King', level : 10, gold: 400, exp : 600, Firecore : 2},
            {name : 'King', level : 20, gold : 800, exp : 900, Firecore : 2},
            {name : 'King', level : 30, gold : 1200, exp : 1200, Firecore : 3, 'Acidproof Glaze I' : 3},
            {name : 'King', level : 40, gold : 1600, exp : 1700, 'Firecore' : 3, 'Acidproof Glaze I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'King', level : 50, gold : 2000, exp : 2200, 'Firecore' : 4, 'Acidproof Glaze I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'King', level : 60, gold : 2400, exp : 2900, 'Firecore' : 6, 'Acidproof Glaze I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'King', level : 70, gold : 2800, exp : 3900, 'Firecore' : 8, 'Acidproof Glaze I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'King', level : 80, gold : 3200, exp : 5000, 'Firecore' : 11, 'Acidproof Glaze I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'King', level : 90, gold : 3600, exp : 5800, 'Heart of lava' : 5, 'Acidproof Glaze II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'King', level : 100, gold : 4000, exp : 6400, 'Heart of lava' : 6, 'Acidproof Glaze II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'King', level : 110, gold : 4400, exp : 7100, 'Heart of lava' : 8, 'Acidproof Glaze II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'King', level : 120, gold : 4800, exp : 7600, 'Heart of lava' : 11, 'Acidproof Glaze II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'King', level : 130, gold : 5200, exp : 8000, 'Heart of lava' : 15, 'Acidproof Glaze II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'King', level : 140, gold : 5600, exp : 8500, 'Heart of lava' : 20, 'Acidproof Glaze II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'King', level : 150, gold : 6000, exp : 0, 'Sunsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'King', level : 160, gold : 6400, exp : 0, 'Sunsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            
            {name : 'Lin', level : 0, gold : 40, exp : 400},
            {name : 'Lin', level : 10, gold: 400, exp : 600, 'Nano Coating I' : 2, 'Acidproof Glaze I' : 2},
            {name : 'Lin', level : 20, gold : 800, exp : 900, 'Nano Coating I' : 3, 'Acidproof Glaze I' : 3},
            {name : 'Lin', level : 30, gold : 1200, exp : 1200, 'Nano Coating I' : 4, 'Acidproof Glaze I' : 4},
            {name : 'Lin', level : 40, gold : 1600, exp : 2700, 'Nano Coating I' : 3, 'Acidproof Glaze I' : 3, 'Booster Frame I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Lin', level : 50, gold : 200, exp : 2200, 'Nano Coating I' : 4, 'Acidproof Glaze I' : 4, 'Booster Frame I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'Lin', level : 60, gold : 2400, exp : 2900, 'Nano Coating I' : 5, 'Acidproof Glaze I' : 5, 'Booster Frame I' : 5, 'Nanofiber Frame I' : 5},
            {name : 'Lin', level : 70, gold : 2800, exp : 3900, 'Nano Coating I' : 6, 'Acidproof Glaze I' : 6, 'Booster Frame I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Lin', level : 80, gold : 3200, exp : 5000, 'Nano Coating I' : 8, 'Acidproof Glaze I' : 8, 'Booster Frame I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Lin', level : 90, gold : 3600, exp : 5800, 'Nano Coating II' : 5, 'Acidproof Glaze II' : 5, 'Booster Frame II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Lin', level : 100, gold : 3600, exp : 6400, 'Nano Coating II' : 6, 'Acidproof Glaze II' : 6, 'Booster Frame II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Lin', level : 110, gold : 4000, exp : 7100, 'Nano Coating II' : 8, 'Acidproof Glaze II' : 8, 'Booster Frame II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'Lin', level : 120, gold : 4800, exp : 7600, 'Nano Coating II' : 11, 'Acidproof Glaze II' : 11, 'Booster Frame II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Lin', level : 130, gold : 5200, exp : 8000, 'Nano Coating II' : 15, 'Acidproof Glaze II' : 15, 'Booster Frame II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Lin', level : 140, gold : 5600, exp : 8500, 'Nano Coating II' : 20, 'Acidproof Glaze II' : 20, 'Booster Frame II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Lin', level : 150, gold : 6000, exp : 0, 'Nano Coating III' : 4, 'Acidproof Glaze III' : 4, 'Booster Frame III' : 4, 'Nanofiber Frame III' : 4},
            {name : 'Lin', level : 160, gold : 6400, exp : 0, 'Nano Coating III' : 4, 'Acidproof Glaze III' : 4, 'Booster Frame III' : 4, 'Nanofiber Frame III' : 4},

                        
            {name : 'Lyra', level : 0, gold : 0, exp : 400},
            {name : 'Lyra', level : 10, gold : 400, exp : 600, 'Rockcore' : 2},
            {name : 'Lyra', level : 20, gold : 800, exp : 900, 'Rockcore' : 2},
            {name : 'Lyra', level : 30, gold : 1200, exp : 1200, 'Rockcore' : 3, 'Nano Coating I' : 3},
            {name : 'Lyra', level : 40, gold : 1600, exp : 1700, 'Rockcore' : 3, 'Nano Coating I' : 3, 'Booster Frame I' : 3},
            {name : 'Lyra', level : 50, gold : 2000, exp : 2200, 'Rockcore' : 4, 'Nano Coating I': 4, 'Booster Frame I' : 4},
            {name : 'Lyra', level : 60, gold : 2400, exp : 2900, 'Rockcore' : 6, 'Nano Coating I' : 6, 'Booster Frame I' : 6},
            {name : 'Lyra', level : 70, gold : 2800, exp : 3900, 'Rockcore' : 8, 'Nano Coating I' : 8, 'Booster Frame I' : 8},
            {name : 'Lyra', level : 80, gold : 3200, exp : 5000, 'Rockcore' : 11, 'Nano Coating I' : 11, 'Booster Frame I' : 11},
            {name : 'Lyra', level : 90, gold : 3600, exp : 5800, 'Heart of summit' : 5, 'Nano Coating II' : 5, 'Booster Frame II' : 5},
            {name : 'Lyra', level : 100, gold : 4000, exp : 6400, 'Heart of summit' : 6, 'Nano Coating II' : 6, 'Booster Frame II' : 6},
            {name : 'Lyra', level : 110, gold : 4400, exp : 7100, 'Heart of summit' : 8, 'Nano Coating II' :  8, 'Booster Frame II' : 8},
            {name : 'Lyra', level : 120, gold : 4800, exp : 7600, 'Heart of summit' : 11, 'Nano Coating II' : 11, 'Booster Frame II' : 11},
            {name : 'Lyra', level : 130, gold : 5200, exp : 8000, 'Heart of summit' : 15, 'Nano Coating II' : 15, 'Booster Frame II' : 15},
            {name : 'Lyra', level : 140, gold : 5600, exp : 8500, 'Heart of summit' : 20, 'Nano Coating II' : 20, 'Booster Frame II' : 20},
            {name : 'Lyra', level : 150, gold : 6000, exp : 0, 'Landsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            {name : 'Lyra', level : 160, gold : 6400, exp : 0, 'Landsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
        
            {name : 'Meryl', level : 0, gold : 0, exp : 400},
            {name : 'Meryl', level : 10, gold: 400, exp : 600, Icecore : 2},
            {name : 'Meryl', level : 20, gold : 800, exp : 900, Icecore : 2},
            {name : 'Meryl', level : 30, gold : 1200, exp : 1200, Icecore : 3, 'Nano Coating I' : 3},
            {name : 'Meryl', level : 40, gold : 1600, exp : 1700, 'Icecore' : 3, 'Nano Coating I' : 3, 'Booster Frame I' : 3},
            {name : 'Meryl', level : 50, gold : 2000, exp : 2200, 'Icecore' : 4, 'Nano Coating I' : 4, 'Booster Frame I' : 4},
            {name : 'Meryl', level : 60, gold : 2400, exp : 2900, 'Icecore' : 6, 'Nano Coating I' : 6, 'Booster Frame I' : 6},
            {name : 'Meryl', level : 70, gold : 2800, exp : 3900, 'Icecore' : 8, 'Nano Coating I' : 8, 'Booster Frame I' : 8},
            {name : 'Meryl', level : 80, gold : 3200, exp : 5000, 'Icecore' : 11, 'Nano Coating I' : 11, 'Booster Frame I' : 11},
            {name : 'Meryl', level : 90, gold : 3600, exp : 5800, 'Heart of winter' : 5, 'Nano Coating II' : 5, 'Booster Frame II' : 5},
            {name : 'Meryl', level : 100, gold : 4000, exp : 6400, 'Heart of winter' : 6, 'Nano Coating II' : 6, 'Booster Frame II' : 6},
            {name : 'Meryl', level : 110, gold : 4400, exp : 7100, 'Heart of winter' : 8, 'Nano Coating II' : 8, 'Booster Frame II' : 8},
            {name : 'Meryl', level : 120, gold : 4800, exp : 7600, 'Heart of winter' : 11, 'Nano Coating II' : 11, 'Booster Frame II' : 11},
            {name : 'Meryl', level : 130, gold : 5200, exp : 8000, 'Heart of winter' : 15, 'Nano Coating II' : 15, 'Booster Frame II' : 15},
            {name : 'Meryl', level : 140, gold : 5600, exp : 8500, 'Heart of winter' : 20, 'Nano Coating II' : 20, 'Booster Frame II' : 20},
            {name : 'Meryl', level : 150, gold : 6000, exp : 0, 'Snowsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            {name : 'Meryl', level : 160, gold : 6400, exp : 0, 'Snowsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
                    
            {name : 'Nemesis', level : 0, gold : 0, exp : 400},
            {name : 'Nemesis', level : 10, gold: 400, exp : 600, Magcore : 2},
            {name : 'Nemesis', level : 20, gold : 800, exp : 900, Magcore : 2},
            {name : 'Nemesis', level : 30, gold : 1200, exp : 1200, Magcore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Nemesis', level : 40, gold : 1600, exp : 1700, 'Magcore' : 3, 'Acidproof Glaze I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Nemesis', level : 50, gold : 2000, exp : 2200, 'Magcore' : 4, 'Acidproof Glaze I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'Nemesis', level : 60, gold : 2400, exp : 2900, 'Magcore' : 6, 'Acidproof Glaze I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Nemesis', level : 70, gold : 2800, exp : 3900, 'Magcore' : 8, 'Acidproof Glaze I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Nemesis', level : 80, gold : 3200, exp : 5000, 'Magcore' : 11, 'Acidproof Glaze I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Nemesis', level : 90, gold : 3600, exp : 5800, 'Heart of lightning' : 5, 'Acidproof Glaze II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Nemesis', level : 100, gold : 4000, exp : 6400, 'Heart of lightning' : 6, 'Acidproof Glaze II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Nemesis', level : 110, gold : 4400, exp : 7100, 'Heart of lightning' : 8, 'Acidproof Glaze II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'Nemesis', level : 120, gold : 4800, exp : 7600, 'Heart of lightning' : 11, 'Acidproof Glaze II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Nemesis', level : 130, gold : 5200, exp : 8000, 'Heart of lightning' : 15, 'Acidproof Glaze II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Nemesis', level : 140, gold : 5600, exp : 8500, 'Heart of lightning' : 20, 'Acidproof Glaze II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Nemesis', level : 150, gold : 6000, exp : 0, 'Lightningsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Nemesis', level : 160, gold : 6400, exp : 0, 'Lightningsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
        
            {name : 'Ruby', level : 0, gold : 0, exp : 400},
            {name : 'Ruby', level : 10, gold: 400, exp : 600, Firecore : 2},
            {name : 'Ruby', level : 20, gold : 800, exp : 900, Firecore : 2},
            {name : 'Ruby', level : 30, gold : 1200, exp : 1200, Firecore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Ruby', level : 40, gold : 1600, exp : 1700, 'Firecore' : 3, 'Acidproof Glaze I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Ruby', level : 50, gold : 2000, exp : 2200, 'Firecore' : 4, 'Acidproof Glaze I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'Ruby', level : 60, gold : 2400, exp : 2900, 'Firecore' : 6, 'Acidproof Glaze I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Ruby', level : 70, gold : 2800, exp : 3900, 'Firecore' : 8, 'Acidproof Glaze I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Ruby', level : 80, gold : 3200, exp : 5000, 'Firecore' : 11, 'Acidproof Glaze I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Ruby', level : 90, gold : 3600, exp : 5800, 'Heart of lava' : 5, 'Acidproof Glaze II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Ruby', level : 100, gold : 4000, exp : 6400, 'Heart of lava' : 6, 'Acidproof Glaze II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Ruby', level : 110, gold : 4400, exp : 7100, 'Heart of lava' : 8, 'Acidproof Glaze II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'Ruby', level : 120, gold : 4800, exp : 7600, 'Heart of lava' : 11, 'Acidproof Glaze II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Ruby', level : 130, gold : 5200, exp : 8000, 'Heart of lava' : 15, 'Acidproof Glaze II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Ruby', level : 140, gold : 5600, exp : 8500, 'Heart of lava' : 20, 'Acidproof Glaze II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Ruby', level : 150, gold : 6000, exp : 0, 'Sunsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Ruby', level : 160, gold : 6400, exp : 0, 'Sunsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            
            {name : 'Saki fuwa', level : 0, gold : 0, exp : 400},
            {name : 'Saki fuwa', level : 10, gold: 400, exp : 600, Icecore : 2},
            {name : 'Saki fuwa', level : 20, gold : 800, exp : 900, Icecore : 2},
            {name : 'Saki fuwa', level : 30, gold : 1200, exp : 1200, Icecore : 3, 'Nano Coating I' : 3},
            {name : 'Saki fuwa', level : 40, gold : 1600, exp : 1700, 'Icecore' : 3, 'Nano Coating I' : 3, 'Booster Frame I' : 3},
            {name : 'Saki fuwa', level : 50, gold : 2000, exp : 2200, 'Icecore' : 4, 'Nano Coating I' : 4, 'Booster Frame I' : 4},
            {name : 'Saki fuwa', level : 60, gold : 2400, exp : 2900, 'Icecore' : 6, 'Nano Coating I' : 6, 'Booster Frame I' : 6},
            {name : 'Saki fuwa', level : 70, gold : 2800, exp : 3900, 'Icecore' : 8, 'Nano Coating I' : 8, 'Booster Frame I' : 8},
            {name : 'Saki fuwa', level : 80, gold : 3200, exp : 5000, 'Icecore' : 11, 'Nano Coating I' : 11, 'Booster Frame I' : 11},
            {name : 'Saki fuwa', level : 90, gold : 3600, exp : 5800, 'Heart of winter' : 5, 'Nano Coating II' : 5, 'Booster Frame II' : 5},
            {name : 'Saki fuwa', level : 100, gold : 4000, exp : 6400, 'Heart of winter' : 6, 'Nano Coating II' : 6, 'Booster Frame II' : 6},
            {name : 'Saki fuwa', level : 110, gold : 4400, exp : 7100, 'Heart of winter' : 8, 'Nano Coating II' : 8, 'Booster Frame II' : 8},
            {name : 'Saki fuwa', level : 120, gold : 4800, exp : 7600, 'Heart of winter' : 11, 'Nano Coating II' : 11, 'Booster Frame II' : 11},
            {name : 'Saki fuwa', level : 130, gold : 5200, exp : 8000, 'Heart of winter' : 15, 'Nano Coating II' : 15, 'Booster Frame II' : 15},
            {name : 'Saki fuwa', level : 140, gold : 5600, exp : 8500, 'Heart of winter' : 20, 'Nano Coating II' : 20, 'Booster Frame II' : 20},
            {name : 'Saki fuwa', level : 150, gold : 6000, exp : 0, 'Snowsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            {name : 'Saki fuwa', level : 160, gold : 6400, exp : 0, 'Snowsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            
            {name : 'Samir', level : 0, gold : 0, exp : 400},
            {name : 'Samir', level : 10, gold : 400, exp : 600, 'Magcore' : 2},
            {name : 'Samir', level : 20, gold : 800, exp : 900, 'Magcore' : 2},
            {name : 'Samir', level : 30, gold : 1200, exp : 1200, 'Magcore' : 3, 'Nano Coating I' : 3},
            {name : 'Samir', level : 40, gold : 1600, exp : 1700, 'Magcore' : 3, 'Nano Coating I' : 3, 'Booster Frame I' : 3},
            {name : 'Samir', level : 50, gold : 2000, exp : 2200, 'Magcore' : 4, 'Nano Coating I': 4, 'Booster Frame I' : 4},
            {name : 'Samir', level : 60, gold : 2400, exp : 2900, 'Magcore' : 6, 'Nano Coating I' : 6, 'Booster Frame I' : 6},
            {name : 'Samir', level : 70, gold : 2800, exp : 3900, 'Magcore' : 8, 'Nano Coating I' : 8, 'Booster Frame I' : 8},
            {name : 'Samir', level : 80, gold : 3200, exp : 5000, 'Magcore' : 11, 'Nano Coating I' : 11, 'Booster Frame I' : 11},
            {name : 'Samir', level : 90, gold : 3600, exp : 5800, 'Heart of lightning' : 5, 'Nano Coating II' : 5, 'Booster Frame II' : 5},
            {name : 'Samir', level : 100, gold : 4000, exp : 6400, 'Heart of lightning' : 6, 'Nano Coating II' : 6, 'Booster Frame II' : 6},
            {name : 'Samir', level : 110, gold : 4400, exp : 7100, 'Heart of lightning' : 8, 'Nano Coating II' :  8, 'Booster Frame II' : 8},
            {name : 'Samir', level : 120, gold : 4800, exp : 7600, 'Heart of lightning' : 11, 'Nano Coating II' : 11, 'Booster Frame II' : 11},
            {name : 'Samir', level : 130, gold : 5200, exp : 8000, 'Heart of lightning' : 15, 'Nano Coating II' : 15, 'Booster Frame II' : 15},
            {name : 'Samir', level : 140, gold : 5600, exp : 8500, 'Heart of lightning' : 20, 'Nano Coating II' : 20, 'Booster Frame II' : 20},
            {name : 'Samir', level : 150, gold : 6000, exp : 0, 'Lightningsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            {name : 'Samir', level : 160, gold : 6400, exp : 0, 'Lightningsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            
            {name : 'Shiro', level : 0, gold : 0, exp : 400},
            {name : 'Shiro', level : 10, gold: 400, exp : 600, Rockcore : 2},
            {name : 'Shiro', level : 20, gold : 800, exp : 900, Rockcore : 2},
            {name : 'Shiro', level : 30, gold : 1200, exp : 1200, Rockcore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Shiro', level : 40, gold : 1600, exp : 1700, 'Rockcore' : 3, 'Acidproof Glaze I' : 3, 'Booster Frame I' : 3},
            {name : 'Shiro', level : 50, gold : 2000, exp : 2200, 'Rockcore' : 4, 'Acidproof Glaze I' : 4, 'Booster Frame I' : 4},
            {name : 'Shiro', level : 60, gold : 2400, exp : 2900, 'Rockcore' : 6, 'Acidproof Glaze I' : 6, 'Booster Frame I' : 6},
            {name : 'Shiro', level : 70, gold : 2800, exp : 3900, 'Rockcore' : 8, 'Acidproof Glaze I' : 8, 'Booster Frame I' : 8},
            {name : 'Shiro', level : 80, gold : 3200, exp : 5000, 'Rockcore' : 11, 'Acidproof Glaze I' : 11, 'Booster Frame I' : 11},
            {name : 'Shiro', level : 90, gold : 3600, exp : 5800, 'Heart of summit' : 5, 'Acidproof Glaze II' : 5, 'Booster Frame II' : 5},
            {name : 'Shiro', level : 100, gold : 4000, exp : 6400, 'Heart of summit' : 6, 'Acidproof Glaze II' : 6, 'Booster Frame II' : 6},
            {name : 'Shiro', level : 110, gold : 4400, exp : 7100, 'Heart of summit' : 8, 'Acidproof Glaze II' : 8, 'Booster Frame II' : 8},
            {name : 'Shiro', level : 120, gold : 4800, exp : 7600, 'Heart of summit' : 11, 'Acidproof Glaze II' : 11, 'Booster Frame II' : 11},
            {name : 'Shiro', level : 130, gold : 5200, exp : 8000, 'Heart of summit' : 15, 'Acidproof Glaze II' : 15, 'Booster Frame II' : 15},
            {name : 'Shiro', level : 140, gold : 5600, exp : 8500, 'Heart of summit' : 20, 'Acidproof Glaze II' : 20, 'Booster Frame II' : 20},
            {name : 'Shiro', level : 150, gold : 6000, exp : 0, 'Landsource' : 5, 'Acidproof Glaze III' : 5, 'Booster Frame III' : 5},
            {name : 'Shiro', level : 160, gold : 6400, exp : 0, 'Landsource' : 5, 'Acidproof Glaze III' : 5, 'Booster Frame III' : 5},
       
            {name : 'Tian Lang', level : 0, gold : 0, exp : 400},
            {name : 'Tian Lang', level : 10, gold: 400, exp : 600, Magcore : 2},
            {name : 'Tian Lang', level : 20, gold : 800, exp : 900, Magcore : 2},
            {name : 'Tian Lang', level : 30, gold : 1200, exp : 1200, Magcore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Tian Lang', level : 40, gold : 1600, exp : 1700, 'Magcore' : 3, 'Acidproof Glaze I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Tian Lang', level : 50, gold : 2000, exp : 2200, 'Magcore' : 4, 'Acidproof Glaze I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'Tian Lang', level : 60, gold : 2400, exp : 2900, 'Magcore' : 6, 'Acidproof Glaze I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Tian Lang', level : 70, gold : 2800, exp : 3900, 'Magcore' : 8, 'Acidproof Glaze I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Tian Lang', level : 80, gold : 3200, exp : 5000, 'Magcore' : 11, 'Acidproof Glaze I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Tian Lang', level : 90, gold : 3600, exp : 5800, 'Heart of lightning' : 5, 'Acidproof Glaze II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Tian Lang', level : 100, gold : 4000, exp : 6400, 'Heart of lightning' : 6, 'Acidproof Glaze II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Tian Lang', level : 110, gold : 4400, exp : 7100, 'Heart of lightning' : 8, 'Acidproof Glaze II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'Tian Lang', level : 120, gold : 4800, exp : 7600, 'Heart of lightning' : 11, 'Acidproof Glaze II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Tian Lang', level : 130, gold : 5200, exp : 8000, 'Heart of lightning' : 15, 'Acidproof Glaze II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Tian Lang', level : 140, gold : 5600, exp : 8500, 'Heart of lightning' : 20, 'Acidproof Glaze II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Tian Lang', level : 150, gold : 6000, exp : 0, 'Lightningsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Tian Lang', level : 160, gold : 6400, exp : 0, 'Lightningsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
        
            {name : 'Tsubasa', level : 0, gold : 0, exp : 400},
            {name : 'Tsubasa', level : 10, gold: 400, exp : 600, Icecore : 2},
            {name : 'Tsubasa', level : 20, gold : 800, exp : 900, Icecore : 2},
            {name : 'Tsubasa', level : 30, gold : 1200, exp : 1200, Icecore : 3, 'Nano Coating I' : 3},
            {name : 'Tsubasa', level : 40, gold : 1600, exp : 1700, 'Icecore' : 3, 'Nano Coating I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Tsubasa', level : 50, gold : 2000, exp : 2200, 'Icecore' : 4, 'Nano Coating I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'Tsubasa', level : 60, gold : 2400, exp : 2900, 'Icecore' : 6, 'Nano Coating I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Tsubasa', level : 70, gold : 2800, exp : 3900, 'Icecore' : 8, 'Nano Coating I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Tsubasa', level : 80, gold : 3200, exp : 5000, 'Icecore' : 11, 'Nano Coating I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Tsubasa', level : 90, gold : 3600, exp : 5800, 'Heart of winter' : 5, 'Nano Coating II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Tsubasa', level : 100, gold : 4000, exp : 6400, 'Heart of winter' : 6, 'Nano Coating II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Tsubasa', level : 110, gold : 4400, exp : 7100, 'Heart of winter' : 8, 'Nano Coating II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'Tsubasa', level : 120, gold : 4800, exp : 7600, 'Heart of winter' : 11, 'Nano Coating II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Tsubasa', level : 130, gold : 5200, exp : 8000, 'Heart of winter' : 15, 'Nano Coating II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Tsubasa', level : 140, gold : 5600, exp : 8500, 'Heart of winter' : 20, 'Nano Coating II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Tsubasa', level : 150, gold : 6000, exp : 0, 'Snowsource' : 5, 'Nano Coating III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Tsubasa', level : 160, gold : 6400, exp : 0, 'Snowsource' : 5, 'Nano Coating III' : 5, 'Nanofiber Frame III' : 5},
                    
            {name : 'Umi', level : 0, gold : 0, exp : 400},
            {name : 'Umi', level : 10, gold : 400, exp : 600, 'Rockcore' : 2},
            {name : 'Umi', level : 20, gold : 800, exp : 900, 'Rockcore' : 2},
            {name : 'Umi', level : 30, gold : 1200, exp : 1200, 'Rockcore' : 3, 'Nano Coating I' : 3},
            {name : 'Umi', level : 40, gold : 1600, exp : 1700, 'Rockcore' : 3, 'Nano Coating I' : 3, 'Booster Frame I' : 3},
            {name : 'Umi', level : 50, gold : 2000, exp : 2200, 'Rockcore' : 4, 'Nano Coating I': 4, 'Booster Frame I' : 4},
            {name : 'Umi', level : 60, gold : 2400, exp : 2900, 'Rockcore' : 6, 'Nano Coating I' : 6, 'Booster Frame I' : 6},
            {name : 'Umi', level : 70, gold : 2800, exp : 3900, 'Rockcore' : 8, 'Nano Coating I' : 8, 'Booster Frame I' : 8},
            {name : 'Umi', level : 80, gold : 3200, exp : 5000, 'Rockcore' : 11, 'Nano Coating I' : 11, 'Booster Frame I' : 11},
            {name : 'Umi', level : 90, gold : 3600, exp : 5800, 'Heart of summit' : 5, 'Nano Coating II' : 5, 'Booster Frame II' : 5},
            {name : 'Umi', level : 100, gold : 4000, exp : 6400, 'Heart of summit' : 6, 'Nano Coating II' : 6, 'Booster Frame II' : 6},
            {name : 'Umi', level : 110, gold : 4400, exp : 7100, 'Heart of summit' : 8, 'Nano Coating II' :  8, 'Booster Frame II' : 8},
            {name : 'Umi', level : 120, gold : 4800, exp : 7600, 'Heart of summit' : 11, 'Nano Coating II' : 11, 'Booster Frame II' : 11},
            {name : 'Umi', level : 130, gold : 5200, exp : 8000, 'Heart of summit' : 15, 'Nano Coating II' : 15, 'Booster Frame II' : 15},
            {name : 'Umi', level : 140, gold : 5600, exp : 8500, 'Heart of summit' : 20, 'Nano Coating II' : 20, 'Booster Frame II' : 20},
            {name : 'Umi', level : 150, gold : 6000, exp : 0, 'Landsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
            {name : 'Umi', level : 160, gold : 6400, exp : 0, 'Landsource' : 5, 'Nano Coating III' : 5, 'Booster Frame III' : 5},
        
            {name : 'Zero', level : 0, gold : 0, exp : 400},
            {name : 'Zero', level : 10, gold: 400, exp : 600, Firecore : 2},
            {name : 'Zero', level : 20, gold : 800, exp : 900, Firecore : 2},
            {name : 'Zero', level : 30, gold : 1200, exp : 1200, Firecore : 3, 'Acidproof Glaze I' : 3},
            {name : 'Zero', level : 40, gold : 1600, exp : 1700, 'Firecore' : 3, 'Acidproof Glaze I' : 3, 'Nanofiber Frame I' : 3},
            {name : 'Zero', level : 50, gold : 2000, exp : 2200, 'Firecore' : 4, 'Acidproof Glaze I' : 4, 'Nanofiber Frame I' : 4},
            {name : 'Zero', level : 60, gold : 2400, exp : 2900, 'Firecore' : 6, 'Acidproof Glaze I' : 6, 'Nanofiber Frame I' : 6},
            {name : 'Zero', level : 70, gold : 2800, exp : 3900, 'Firecore' : 8, 'Acidproof Glaze I' : 8, 'Nanofiber Frame I' : 8},
            {name : 'Zero', level : 80, gold : 3200, exp : 5000, 'Firecore' : 11, 'Acidproof Glaze I' : 11, 'Nanofiber Frame I' : 11},
            {name : 'Zero', level : 90, gold : 3600, exp : 5800, 'Heart of lava' : 5, 'Acidproof Glaze II' : 5, 'Nanofiber Frame II' : 5},
            {name : 'Zero', level : 100, gold : 4000, exp : 6400, 'Heart of lava' : 6, 'Acidproof Glaze II' : 6, 'Nanofiber Frame II' : 6},
            {name : 'Zero', level : 110, gold : 4400, exp : 7100, 'Heart of lava' : 8, 'Acidproof Glaze II' : 8, 'Nanofiber Frame II' : 8},
            {name : 'Zero', level : 120, gold : 4800, exp : 7600, 'Heart of lava' : 11, 'Acidproof Glaze II' : 11, 'Nanofiber Frame II' : 11},
            {name : 'Zero', level : 130, gold : 5200, exp : 8000, 'Heart of lava' : 15, 'Acidproof Glaze II' : 15, 'Nanofiber Frame II' : 15},
            {name : 'Zero', level : 140, gold : 5600, exp : 8500, 'Heart of lava' : 20, 'Acidproof Glaze II' : 20, 'Nanofiber Frame II' : 20},
            {name : 'Zero', level : 150, gold : 6000, exp : 0, 'Sunsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            {name : 'Zero', level : 160, gold : 6400, exp : 0, 'Sunsource' : 5, 'Acidproof Glaze III' : 5, 'Nanofiber Frame III' : 5},
            
        ]))
    localStorage.setItem('numberOfCharacters', 22);
    localStorage.setItem('simulacraMaterials', JSON.stringify([
        'Acidproof Glaze I',
        'Acidproof Glaze II',
        'Acidproof Glaze III',
        'Booster Frame I',
        'Booster Frame II',
        'Booster Frame III',
        'Nanofiber Frame I',
        'Nanofiber Frame II',
        'Nanofiber Frame III',
        'Nano Coating I',
        'Nano Coating II',
        'Nano Coating III',
        'Firecore',
        'Heart of lava',
        'Sunsource',
        'Icecore',
        'Heart of winter',
        'Snowsource',
        'Magcore',
        'Heart of lightning',
        'Lightningsource',
        'Rockcore',
        'Heart of summit',
        'Landsource',
        'gold',
        'exp'
    ]));
    if(localStorage.getItem('needed' == null)){

        localStorage.setItem('needed', JSON.stringify([]));
    }
}
init();
class Material {
    name;
    amound;
    writable = true;


    constructor(name, amound){
        this.name = name;
        this.amound = amound;
    }


}
class Simulacra{
    name;
    level;
    materials;
    gold;
    exp;

    constructor(name, level, gold, exp, materials){
        this.name = name;
        this.materials = materials;
        this.level = level;
        this.gold = gold;
        this.exp = exp;
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
        let imagelink = "./images/" + store[i].name.split(' ').join('_').toLowerCase()+'.png';
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
        let imagelink = "./images/" + key.split(' ').join('_').toLowerCase()+'.png';
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
        let imagelink = "./images/" + value.name.split(' ').join('_').toLowerCase()+'.png';
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
        let imagelink = "./images/" + value.name.split(' ').join('_').toLowerCase()+'.png';
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

    document.getElementById('runs-needed').innerHTML = "Number of runs a day needed: ";
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


if(location.href.split('#')[0] === 'https://tofmc.com/info.html'){
document.getElementById('save').addEventListener('click', ()=>{getLocalstorageToFile('tofmc-materials.json')})

function getLocalstorageToFile(fileName) {
  
  /* dump local storage to string */
  
  var a = {};
  let store = ['boxes', 'materials', 'battery'];
  for(let i = 0; i < store.length; i++){
  var k = store[i];
  var v = JSON.parse(localStorage.getItem(k));
  a[k] = [v];
  }
  
  
  /* save as blob */
  
  var textToSave = JSON.stringify(a)
  var textToSaveAsBlob = new Blob([textToSave], {
    type: "text/plain"
  });
  var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
  
  /* download without button hack */
  
  var downloadLink = document.createElement("a");
  downloadLink.download = fileName;
  downloadLink.innerHTML = "Download File";
  downloadLink.href = textToSaveAsURL;
  downloadLink.onclick = function () {
    document.body.removeChild(event.target);
  };
  downloadLink.style.display = "none";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  feedback('save');
}

const fileSelector = document.getElementById('backup');
fileSelector.addEventListener('change', () => {
    const [file] = document.querySelector('input[type=file]').files;
    if(file.type !== 'application/json'){
      feedback('upload-fail');
      // alert("JSON file only. Make sure its from the site.");
      return false;
    }
    const reader = new FileReader();

    reader.addEventListener("load", () => {
        // this will then display a text file
        let mats = Object.entries(JSON.parse(reader.result));
        for(let i = 0; i < mats.length; i++){
          localStorage.setItem(mats[i][0], JSON.stringify(mats[i][1][0]));
        }
        
    }, false);
    feedback('upload');
    if (file) {
        reader.readAsText(file);
    }
});

    let url = location.href.split('#')[1];
    console.log(url);
    switch(url){
        case 'future':
            document.getElementById('future').style.display = "grid";
        break;
        case 'download':
            document.getElementById('download').style.display = "grid";
        break;
        case 'update':
            document.getElementById('update').style.display = "grid";
        break;
        case 'dimensional':
            document.getElementById('dimensional').style.display = "grid";
        break;
        case 'simulacra':
            document.getElementById('simulacra').style.display = "grid";
        break;
    }
}
if(location.href === 'https://tofmc.com/change.html'){

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

if(location.href === 'https://tofmc.com/index.html' || location.href === 'https://tofmc.com/' || location.href === 'https://tofmc.com'){

document.getElementById('needed').addEventListener('submit', handleSubmit);
document.getElementById('calc-amound-runs').addEventListener('submit', handleSubmit);

document.getElementById('clearGoal').addEventListener('click', clearGoal);
// createSimList('simulacrum-list');
if(localStorage.hasOwnProperty('needed')){
  createSimListNeed('goalNeeded-list');
}
createSimListCalcLevel('simulacrum-level');
createSimListCalcChar('simulacrum-name');

createLists('materials-list');
createLists('boxes-list');
// createSimList('simulacrum-list');

document.getElementById('reset').addEventListener('click', function(){
  if(confirm("are you sure you want to remove ALL storage?")){
    localStorage.clear();
    }})
}

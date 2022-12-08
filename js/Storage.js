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
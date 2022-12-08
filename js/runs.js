
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


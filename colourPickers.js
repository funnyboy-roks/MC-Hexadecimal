// const pickers = {
//     pickers: [],
//     newPicker: (d=null) =>{
//         let np = 
//     }
// }
const draggable = new Draggable.Sortable(document.querySelectorAll('div.colour-pickers'), {
    draggable: 'div.colour-picker'
});
// const droppable = new Draggable.Droppable(document.querySelectorAll('div.colour-pickers'), {
//     draggable: 'div.colour-picker',
//     // dropzone: 'div.colour-pickers'
//   });

pickers = [];
function addColourPicker(){
    let newDiv = document.createElement('div');
    newDiv.classList.add('colour-picker');
    newDiv.innerHTML = `=Colour #${pickers.length+1}: <input type="color" id="color-picker-${pickers.length}" value="#ff00ff">`
    document.querySelector('div.colour-pickers').appendChild(newDiv)
    pickers.push(newDiv);
}
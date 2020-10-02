const colourPickerDiv = document.querySelector('div.colour-pickers');
const draggable = new Draggable.Sortable(document.querySelectorAll('div.colour-pickers'), {
    draggable: 'div.colour-picker'
});
// const droppable = new Draggable.Droppable(document.querySelectorAll('div.colour-pickers'), {
//     draggable: 'div.colour-picker',
//     // dropzone: 'div.colour-pickers'
//   });

let pickers = [];

function addColourPicker() {
    var newDiv = document.createElement('div');
    newDiv.classList.add('colour-picker');
    newDiv.innerHTML = `=Colour #${pickers.length+1}: <input type="color" id="color-picker-${pickers.length}" value="#000000" oninput="updateColourPicker(${pickers.length});"><a class="delete" title="Remove Colour" onclick="removeColourPicker(${pickers.length});">×</a>`
    var newInput = newDiv.querySelector(`#color-picker-${pickers.length}`);
    colourPickerDiv.appendChild(newDiv);
    pickers.push({
        div: newDiv,
        input: newInput,
        id: `color-picker-${pickers.length}`,
        value: newInput.value,
        pos: pickers.length,
    });
}

function updateColourPicker(id) {
    pickers[id].value = pickers[id].input.value;
    if(pickers.length > 2){
        createGradFromName(document.querySelector('#nameField').value);
    }
}

function getPickerColours() {
    let arr = [];
    for (x of pickers) {
        arr.push(x.value);
    }
    return arr;
}

function removeColourPicker(id) {
    pickers.splice(id, 1);
    updateColourPickers();
}

function updateColourPickers() {
    if (pickers.length == colourPickerDiv.childElementCount - 1) {
        return;
    } else {
        colourPickerDiv.innerHTML = '<button onclick="addColourPicker();">Add Colour</button>';
        let arr = [];
        for (let i in pickers) {
            i = parseInt(i);
            console.log(i);
            let newDiv = document.createElement('div');
            newDiv.classList.add('colour-picker');
            newDiv.innerHTML = `=Colour #${i+1}: <input type="color" id="color-picker-${i}" value="${pickers[i].value}" oninput="updateColourPicker(${i});"><a class="delete" title="Remove Colour" onclick="removeColourPicker(${i});">×</a>`
            newInput = newDiv.querySelector(`#color-picker-${i}`);
            colourPickerDiv.appendChild(newDiv);
            arr.push({
                div: newDiv,
                input: newInput,
                id: `color-picker-${i}`,
                value: newInput.value,
                pos: i,
            })
        }
        pickers = arr;
    }

}
const colourPickerDiv = document.querySelector('div.colour-pickers');
const draggable = new Draggable.Sortable(document.querySelectorAll('div.colour-pickers'), {
    draggable: 'div.colour-picker'
});
// const droppable = new Draggable.Droppable(document.querySelectorAll('div.colour-pickers'), {
//     draggable: 'div.colour-picker',
//     // dropzone: 'div.colour-pickers'
//   });

let pickers = [];
draggable.on('sortable:stop', (sortableEvent) => {
    // updateColourPickers();
    console.log(sortableEvent.oldIndex, sortableEvent.newIndex)
    colourPickersSwap(sortableEvent.oldIndex, sortableEvent.newIndex);
    createGradFromName(document.querySelector('#nameField').value);
    // console.log(draggable);
});

function addColourPicker() {
    var newDiv = document.createElement('div');
    newDiv.classList.add('colour-picker');
    newDiv.innerHTML = `=Colour #${pickers.length+1}: <input type="color" id="i${pickers.length}" value="#000000" oninput="updateColourPicker(this.id.substring(1));"><a class="delete" title="Remove Colour" onclick="removeColourPicker(this.id.substring(1));">×</a>`
    var newInput = newDiv.querySelector(`#i${pickers.length}`);
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
    createGradFromName(document.querySelector('#nameField').value);
}

function colourPickersSwap(id1, id2){
    if(id1 == id2)
        return;
    var temp = pickers[id1];
    pickers[id2].input.id = 'i' + id1;
    pickers[id1] = pickers[id2];
    temp.input.id = 'i' + id2;
    pickers[id2] = temp;

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
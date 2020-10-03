const colourPickerDiv = document.querySelector('div.colour-pickers');
const draggable = new Draggable.Sortable(document.querySelectorAll('div.colour-pickers'), {
    draggable: 'div.colour-picker'
});
let pickers = [];
const idPrefix = "colour-picker";
const deleteButtonHTML = `<button 
class="small" style="
height: 45px;
width: 45px;" 
title="Remove Colour" 
onclick="removeColourPicker(this.id.substring(idPrefix.length));"
><div class="title" style="color: #ff5555; text-shadow: 2px 2px #000a;">×</div>
</button>`;

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
    newDiv.innerHTML = `\u2630 Colour #${pickers.length+1}: 
    <input type="color" 
    id="${idPrefix + pickers.length}" 
    value="#000000" 
    oninput="updateColourPicker(this.id.substring(idPrefix.length));">` + deleteButtonHTML
    var newInput = newDiv.querySelector(`#${idPrefix + pickers.length}`);
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
    pickers[id2].input.id = idPrefix + id1;
    pickers[id1] = pickers[id2];
    temp.input.id = idPrefix + id2;
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
            newDiv.innerHTML = `\u2630 Colour #${i+1}: <input type="color" id="color-picker-${i}" value="${pickers[i].value}" oninput="updateColourPicker(${i});">` + deleteButtonHTML;
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
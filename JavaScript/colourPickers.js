const colourPickerDiv = document.querySelector('div.colour-pickers');
const draggable = new Draggable.Sortable(
	document.querySelectorAll('div.colour-pickers'),
	{
		draggable: 'div.colour-picker',
	}
);
let pickers = [];
const idPrefix = 'colour-picker';
const deleteButtonHTML = `<button 
class="small" style="
height: 45px;
width: 45px;" 
title="Remove Colour" 
onclick="removeColourPicker(this.id.substring(idPrefix.length));"
><div class="title" style="color: #ff5555; text-shadow: 2px 2px #000a;">×</div>
</button>`;
let search = {};

draggable.on('sortable:stop', (sortableEvent) => {
	// updateColourPickers();
	// console.log(sortableEvent.oldIndex, sortableEvent.newIndex);
	colourPickersSwap(sortableEvent.oldIndex, sortableEvent.newIndex);
	createGradFromName(document.querySelector('#nameField').value);
	// console.log(draggable);
});

function addColourPicker(colour = null) {
	var newDiv = document.createElement('div');
	newDiv.classList.add('colour-picker');
	newDiv.innerHTML =
		`\u2630 Colour #${pickers.length + 1}: 
    <input type="color" 
    id="${idPrefix + pickers.length}" 
    oninput="updateColourPicker(this.id.substring(idPrefix.length));">` +
		deleteButtonHTML;
	var newInput = newDiv.querySelector(`#${idPrefix + pickers.length}`);
	newInput.value = '#' + (colour || '000000');
	colourPickerDiv.appendChild(newDiv);
	pickers.push({
		div: newDiv,
		input: newInput,
		id: `color-picker-${pickers.length}`,
		value: newInput.value,
		pos: pickers.length,
	});
	createGradFromName(document.querySelector('#nameField').value);
	updateSearch();
	setHash();
}

function updateColourPicker(id) {
	pickers[id].value = pickers[id].input.value;
	createGradFromName(document.querySelector('#nameField').value);
	
	updateSearch();
	setHash();
}

function colourPickersSwap(id1, id2) {
	if (id1 == id2) return;
	var temp = pickers[id1];
	pickers[id2].input.id = idPrefix + id1;
	pickers[id1] = pickers[id2];
	temp.input.id = idPrefix + id2;
	pickers[id2] = temp;
	
	updateSearch();
	setHash();
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

	updateSearch();
	setHash();
}

function updateColourPickers() {
	if (pickers.length == colourPickerDiv.childElementCount - 1) {
		return;
	} else {
		colourPickerDiv.innerHTML =
			'<button onclick="addColourPicker();">Add Colour</button>';
		let arr = [];
		for (let i in pickers) {
			i = parseInt(i);
			let newDiv = document.createElement('div');
			newDiv.classList.add('colour-picker');
			newDiv.innerHTML =
				`\u2630 Colour #${
					i + 1
				}: <input type="color" id="color-picker-${i}" value="${
					pickers[i].value
				}" oninput="updateColourPicker(${i});">` + deleteButtonHTML;
			newInput = newDiv.querySelector(`#color-picker-${i}`);
			colourPickerDiv.appendChild(newDiv);
			arr.push({
				div: newDiv,
				input: newInput,
				id: `color-picker-${i}`,
				value: newInput.value,
				pos: i,
			});
		}
		pickers = arr;
	}
}

function setupFromSearch() {
	
	if (location.hash.replace('#', '').split('&').length <= 1) return;
	location.hash
		.replace('#', '')
		.split('&')
		.forEach((s) => {
			search[s.split('=')[0]] = s.split('=')[1];
			// addColourPicker(c);
		});
	
	search.colours.replace(/#/g, '').split('-').forEach(addColourPicker);
	document.querySelector('#nameField').value = search.text;
	// console.log(search);
	if(!search.format){search.format = ''}
	// if(!search.format.match(/[lomn]/g)){search.format = ''};
	search.format = dedupe(search.format.replace(/[^lomn]/g, ''));

	for(let x of document.querySelector('#input').children){
		console.log(x);
		if(search.format.includes(x.classList[0])){
			x.children[0].checked = true;
		}else{
			x.children[0].checked = false;
		}
	}

	createGradFromName(search.text);
}

function setHash() {
	let searchStrings = [];
	for (let x of Object.keys(search)) {
		searchStrings.push(`${x}=${search[x]}`);
	}
	return (location.hash = '#' + searchStrings.join('&'));
}

function updateSearch() {
	search.colours = getPickerColours().join('-');
	search.text = document.querySelector('#nameField').value;
	search.format = dedupe((search.format + '').replace(/undefined|[^lomn]/g, ''));
	return search;
}

function dedupe(s){
	let sArr = [];
	for(let x of s){
		if(!sArr.includes(x)){
			sArr.push(x);
		}
	}
	return sArr.join('');
}

function formatChanged(){
	let temp = '';
	for(let x of document.querySelector('#input').children){
		if(x.children[0].checked){
			temp += x.classList[0];
		}
	}
	if(temp != search.format){
		search.format = dedupe(temp)
	}
	setHash();
}
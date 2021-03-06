const coloursOutLabel = document.querySelector('#colours');
const nickOutLabel = document.querySelector('#nick');
const nameField = document.querySelector('#nameField');
const gamma = 2.2;
let format = '&#r1r2g1g2b1b2';
let minimise = true;
let mcDefaultColours = true;

const defaultSettings = {
	farlands: () => {format='&#r1r2g1g2b1b2',minimise=true,mcDefaultColours=true},
	essentials: () => {format='&#r1r2g1g2b1b2';minimise=false;mcDefaultColours=true},
	majekPlugins: () => {format='&#r1r2g1g2b1b2';minimise=false;mcDefaultColours=true},
	hexOnly: () => {format='#r1r2g1g2b1b2';minimise=false;mcDefaultColours=false},
	minHexOnly: () => {format='#r1r2g1g2b1b2';minimise=true;mcDefaultColours=false},
	minHexOnly: () => {format='#r1r2g1g2b1b2';minimise=true;mcDefaultColours=false},
}

window.onload = () => {
	setupFromSearch();
	document.querySelectorAll('.copy-on-click').forEach(elem => {elem.addEventListener('click', () => {
		elem.select();
		document.execCommand('copy');
	})})
	console.log('Hello! There\'s some features that I haven\'t setup the front end part of, but you can still use from this console!');
	console.log('1. Alternate format\nI\'ve added the ability to use an alternate format, instead of the default: `&#rrggbb`.\nI\'ve not added a way to change this on the site yet, but you can do so by changing the `format` variable.  For Example: `format = \'#r1r2g1g2b1b2\'` would format the output as #rrggbb.');
	console.log('2. Disable minimising\nYou can disable the minimising of the hex codes(#rrggbb -> #rgb) by setting the `minimise` variable to false. `minimise = false`');
	console.log('3. Disable MC\'s default colours (&#) in the output\nYou can do this by setting the `mcDefaultColours` variable to false: `mcDefaultColours = false`');
	console.log('There are some default values that you can run in the `defaultSettings` object.  These are methods that will set the variables to what are used in the defualt that you choose.');
	console.log('You\'ll have to refresh the page after each of these changes are made.');
}

function hexStoF(hexidecimalString) {
	// Takes a 2 digit hex value as a string (ex: "2f")
	// Returns the value as a float from 0-1 (ex: 0.1843)
	// Warning: Rounding errors may result in a returned float slightly ouside of the 0-1 range

	// parseInt understands a number starting w/ 0x to be hex
	let asInt = parseInt('0x' + hexidecimalString);
	return asInt / 255.0;
}

function ftoHexS(floatCol) {
	// Takes a float value from 0-1 (ex: 0.1843)
	// Returns the corresponding hex value from 0x00 to 0xff as a string (ex: "2f")
	// The return value will: always have 2 digits, exclude the "0x", be clamped to 0x00-0xff

	let asInt = Math.round(floatCol * 255);
	asInt = Math.min(Math.max(0, asInt), 255); // Clamp from 0-255
	let asHexStr = asInt.toString(16);
	asHexStr = '0'.repeat(2 - asHexStr.length) + asHexStr;
	return asHexStr;
}

function createLinearGradient(count, coloursArr) {
	var rainbow = new Rainbow();

	// Convert the color into linear space
	for (let i = 0; i < coloursArr.length; i++) {
		colour = [
			coloursArr[i].substring(1, 3),
			coloursArr[i].substring(3, 5),
			coloursArr[i].substring(5, 7),
		];
		coloursArr[i] = '#';
		for (let j = 0; j < colour.length; j++) {
			colour[j] = hexStoF(colour[j]); // Convert to float
			colour[j] = colour[j] ** gamma; // Actual gamma->linear conversion
			coloursArr[i] += ftoHexS(colour[j]); // Convert back to hex
		}
	}

	rainbow.setNumberRange(1, count);
	rainbow.setSpectrumByArray(coloursArr);
	var hexCodes = [];
	for (var i = 1; i <= count; i++) {
		var hexColour = rainbow.colourAt(i);

		// Convert the color back into gamma space
		colour = [
			hexColour.substring(0, 2),
			hexColour.substring(2, 4),
			hexColour.substring(4, 6),
		];
		hexColour = '';
		for (let j = 0; j < colour.length; j++) {
			colour[j] = hexStoF(colour[j]); // Convert to float
			colour[j] = colour[j] ** (1 / gamma); // Actual linear->gamma conversion
			hexColour += ftoHexS(colour[j]); // Convert back to hex
		}

		hexCodes.push('#' + hexColour);
	}
	return hexCodes;
}

function createGradient(count, coloursArr) {
	// Temporarily use linear gradient by default until option to switch mode is made
	return createLinearGradient(count, coloursArr);

	var rainbow = new Rainbow();
	rainbow.setNumberRange(1, count);
	rainbow.setSpectrumByArray(coloursArr);
	var hexCodes = [];
	for (var i = 1; i <= count; i++) {
		var hexColour = rainbow.colourAt(i);
		hexCodes.push('#' + hexColour.replace(/0/g, '1'));
	}
	return hexCodes;
}

function createGradFromName(name) {
	colourValues = [];
	pickers.forEach((x) => {
		colourValues.push(x.value);
	});
	name = name.trim();
	let count = name.length;
	if (Math.min(count, colourValues.length) < 2) return;
	formatting = {
		l: document.querySelector('input#bold').checked,
		o: document.querySelector('input#italics').checked,
		m: document.querySelector('input#strikethrough').checked,
		n: document.querySelector('input#underline').checked,
	};
	formattingClasses = '';
	formattingCodes = '';
	for (k in formatting) {
		if (formatting[k]) {
			formattingClasses += k + ' ';
			formattingCodes += '&' + k;
		}
	}
	formattingClasses = formattingClasses.trim();
	formattingCodes = formattingCodes.trim();

	colours = createGradient(count, colourValues);

	let colouredString = '';
	let colourCodeStr = '';
	for (let i in colours) {
		colouredString += `<span style="color: ${colours[i]}" class="${formattingClasses}">${name[i]}</span>`;
		colourCodeStr += mcHex(colours[i], format, minimise, mcDefaultColours) + formattingCodes + name[i];
	}

	coloursOutLabel.innerText = `Colours (${colourCodeStr.length} chars) (Click To Copy):`;
	nickOutLabel.innerText = `/nick Command (${
		('/nick + ' + colourCodeStr).length
	} chars) (Click To Copy):`;

	document.querySelector('#out-coloured').innerHTML = colouredString;

	let outColourElem = document.querySelector('#out-colour');
	outColourElem.value = colourCodeStr;
	if (colourCodeStr.length > 250) {
		outColourElem.style.color = '#f55';
	} else {
		outColourElem.style.color = '#fff';
	}

	let outNickElem = document.querySelector('#out-nick');
	outNickElem.value = '/nick ' + colourCodeStr;
	if (('/nick ' + colourCodeStr).length > 250) {
		outNickElem.style.color = '#f55';
	} else {
		outNickElem.style.color = '#fff';
	}

	return colouredString;
}
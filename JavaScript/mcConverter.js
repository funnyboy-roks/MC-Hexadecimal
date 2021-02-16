const mcColours = {
	'000': '&0',
	'00a': '&1',
	'0a0': '&2',
	'0aa': '&3',
	a00: '&4',
	a0a: '&5',
	fa0: '&6',
	aaa: '&7',
	555: '&8',
	'55f': '&9',
	'5f5': '&a',
	'5ff': '&b',
	f55: '&c',
	f5f: '&d',
	ff5: '&e',
	fff: '&f',
};

function mcHex(value, format='&#r1r2g1g2b1b2', minimise=true, mcDefaultColours=false) { // Default format: &#rrggbb
	const hexIn = value.replace(/#/g, '').toLowerCase();
	const compressed = compressHex(hexIn);
	if (mcColours[compressed] && mcDefaultColours) {
		return mcColours[compressed];
	}

	matchRegex = hexIn.match(/[0-9a-f]{6}|[0-9a-f]{3}/i);
	if ((hexIn.length == 6 || hexIn.length == 3) && matchRegex) {
		// return minimise && compressed.length <= 3 ? `&#${compressed}` : formatted(format, hexIn); 
		if(minimise && compressed.length <= 3){
			return `&#${compressed}`;
		}
		return formattedHex(format, hexIn);
	}
	return '';
	// OLD METHOD FOR HEX CODES
	// output = '';

	// matchRegex = hexIn.match(/[0-9a-f]{6}|[0-9a-f]{3}/i);
	// if ((hexIn.length == 6 || hexIn.length == 3) && matchRegex) {
	// 	if (matchRegex[0] == hexIn) {
	// 		output = '&x';
	// 		if (hexIn.length == 3) {
	// 			temp = '';
	// 			for (x of hexIn) {
	// 				temp += x + x;
	// 			}
	// 			hexIn = temp;
	// 		}
	// 		for (x of hexIn) {
	// 			output += `&${x}`;
	// 		}
	// 	}
	// }
	// return output;
}

function compressHex(value) {
	value = '' + value;
	if (value.length != 6) {
		return value;
	}
	let out = '';
	for (let x = 0; x < value.length - 1; x += 2) {
		if (value[x] == value[x + 1]) {
			out += value[x];
		}
	}
	if (out.length != 3) {
		return value;
	}
	return out;
}

function formattedHex(format, hex){ // format accepted with r1 r2 g1 g2 b1 b2 as rgb values
	hex.split('').forEach((x, i) => {
		switch(i){
			case 0:
				format = format.replace(/r1/g, x);
				break;
			case 1:
				format = format.replace(/r2/g, x);
				break;
			case 2:
				format = format.replace(/g1/g, x);
				break;
			case 3:
				format = format.replace(/g2/g, x);
				break;
			case 4:
				format = format.replace(/b1/g, x);
				break;
			case 5:
				format = format.replace(/b2/g, x);
				break;
		}
	});
	return format;
}
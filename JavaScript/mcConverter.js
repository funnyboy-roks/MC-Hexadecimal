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

function mcHex(value) {
	hexIn = value.replace(/#/g, '').toLowerCase();
	if (mcColours[compressHex(hexIn)]) {
		return mcColours[compressHex(hexIn)];
	}

	matchRegex = hexIn.match(/[0-9a-f]{6}|[0-9a-f]{3}/i);
	if ((hexIn.length == 6 || hexIn.length == 3) && matchRegex) {
		return `&#${compressHex(hexIn)}`; // Fomat as &#facade
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
  if(out.length != 3){
    return value;
  }
  // return out.replace(/undefined/g, '');
  return out;
}

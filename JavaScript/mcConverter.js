const mcColours = {
	'000000': '&0',
	'0000aa': '&1',
	'00aa00': '&2',
	'00aaaa': '&3',
	aa0000: '&4',
	aa00aa: '&5',
	ffaa00: '&6',
	aaaaaa: '&7',
	555555: '&8',
	'5555ff': '&9',
	'55ff55': '&a',
	'55ffff': '&b',
	ff5555: '&c',
	ff55ff: '&d',
	ffff55: '&e',
	ffffff: '&f',
};

function mcHex(value) {
	hexIn = value.replace(/#/g, '').toLowerCase();
	if (mcColours[hexIn]) {
		return mcColours[hexIn];
	}
	output = '';

	matchRegex = hexIn.match(/[0-9a-f]{6}|[0-9a-f]{3}/i);
	if ((hexIn.length == 6 || hexIn.length == 3) && matchRegex) {
		if (matchRegex[0] == hexIn) {
			output = '&x';
			if (hexIn.length == 3) {
				temp = '';
				for (x of hexIn) {
					temp += x + x;
				}
				hexIn = temp;
			}
			for (x of hexIn) {
				output += `&${x}`;
			}
		}
	}
	return output;
}

function mcHex(value) {
    hexIn = value.replace(/#/g, "");
    output = "";
    matchRegex = hexIn.match(/[0-9a-f]{6}|[0-9a-f]{3}/i);
    if ((hexIn.length == 6 || hexIn.length == 3) && matchRegex) {
      if (matchRegex[0] == hexIn) {
        output = "&x";
        if (hexIn.length == 3) {
          temp = "";
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
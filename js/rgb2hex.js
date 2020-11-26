///////////////////////////////////////////////////////////////////////////////////
/// Colection of RGB to HSB, HSB to RGB convert functions
/// Source: http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
///////////////////////////////////////////////////////////////////////////////////

/**
 * componentToHex convert two digit htx value to R, G or B chanel value
 * @param  number c  value from 0 to 225
 * @return string    value of R, G or B chanel
 * @usage            //alert (componentToHex(255)); //ff
 */
function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

///////////////////////////////////////////////////////////////////////////////////

/**
 * rgbToHex
 * @param  number r Red value
 * @param  number g Green value
 * @param  number b Blue value
 * @return string   hexacimal value
 * @usage           //alert( rgbToHex(0, 51, 255) ); // #0033ff
 */
function rgbToHex(r, g, b) {
	return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

///////////////////////////////////////////////////////////////////////////////////

/**
 * rgbToHex
 * @param  number r  Red value
 * @param  number g  Green value
 * @param  number b  Blue value
 * @return sting     hexacimal value
 * @usage  //alert( rgbToHex(0, 51, 255) ); // #0033ff
 */
function rgbToHex([r, g, b]) {
	return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

///////////////////////////////////////////////////////////////////////////////////

/**
 * hexToRgb
 * @param  string  hex  Hexadicimal value
 * @return number       Color of selected chanel Red, Green or Blue
 * @usage  //alert( hexToRgb("#0033ff").g ); // "51";
 * @usage  //alert( hexToRgb("0033ff").g );  // "51";
 */
function hexToRgb(hex) {
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

///////////////////////////////////////////////////////////////////////////////////

/**
 * hexToRgb 
 * @param  string hex Hexadicimal value
 * @return number     description
 * @usage  //alert(hexToRgb("#0033ff").g); // "51"
 * @usage  //alert(hexToRgb("#03f").g);    // "51"
 * @usage  //alert(hexToRgb("0033ff").g);  // "51"
 * @usage  //alert(hexToRgb("03f").g);     // "51"
 */
function hexToRgb(hex) {
	// Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
		return r + r + g + g + b + b;
	});

	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result ? {
		r: parseInt(result[1], 16),
		g: parseInt(result[2], 16),
		b: parseInt(result[3], 16)
	} : null;
}

///////////////////////////////////////////////////////////////////////////////////

/**
 * [hexToRgb description]
 * @param  string hex Hexadicimal value
 * @return object     Comma separated RGB value
 * @usage  //alert( hexToRgb("#0033ff") ); // 0,51,255
 * @usage  //alert( hexToRgb("x0033ff") ); // 0,51,255
 */
function hexToRgb(hex) {
	return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
}

///////////////////////////////////////////////////////////////////////////////////

/**
 * [hexToRgbA description]
 * @param  string hex     Hexadicimal value
 * @param  number opacity Opacity value
 * @return string         formated rgba(n,n,n,n) string
 * @usage  //alert ( hexToRgbA("#0033ff", 10) ); // rgba(0,51,255,10)
 * @usage  //alert ( hexToRgbA("0033ff", 10) );  // rgba(0,51,255,10)
 * @usage  //alert ( hexToRgbA("#03f", 10) );    // rgba(0,51,255,10)
 * @usage  //alert ( hexToRgbA("03f", 10) );     // rgba(0,51,255,10)
 */
function hexToRgbA(hex, opacity) {
        var h=hex.replace('#', '');
        h =  h.match(new RegExp('(.{'+h.length/3+'})', 'g'));

        for(var i=0; i<h.length; i++)
            h[i] = parseInt(h[i].length==1? h[i]+h[i]:h[i], 16);

        if (typeof opacity != 'undefined')  h.push(opacity);

        return 'rgba('+h.join(',')+')';
}

///////////////////////////////////////////////////////////////////////////////////

// Honestly I have no idea how it works but it works great and it is awesome!

//var c='#dc149c';
//var c='rgb(100%,25%,0)';
//var c = 'red';
//alert(colors.toRgb(c) + '\n' + colors.toHex(c));

String.prototype.padZero = function(len, c) {
	var s = this,
		c = c || "0",
		len = len || 2;
	while (s.length < len) s = c + s;
	return s;
}
var colors = {
	colornames: {
		aqua: '#00ffff',
		black: '#000000',
		blue: '#0000ff',
		fuchsia: '#ff00ff',
		gray: '#808080',
		green: '#008000',
		lime: '#00ff00',
		maroon: '#800000',
		navy: '#000080',
		olive: '#808000',
		purple: '#800080',
		red: '#ff0000',
		silver: '#c0c0c0',
		teal: '#008080',
		white: '#ffffff',
		yellow: '#ffff00'
	},

	toRgb: function(c) {
		c = '0x' + colors.toHex(c).substring(1);
		c = [(c >> 16) & 255, (c >> 8) & 255, c & 255];
		return 'rgb(' + c.join(',') + ')';
	},

	toHex: function(c) {
		var tem, i = 0,
			c = c ? c.toString().toLowerCase() : '';
		if (/^#[a-f0-9]{3,6}$/.test(c)) {
			if (c.length < 7) {
				var A = c.split('');
				c = A[0] + A[1] + A[1] + A[2] + A[2] + A[3] + A[3];
			}
			return c;
		}
		if (/^[a-z]+$/.test(c)) {
			return colors.colornames[c] || '';
		}
		c = c.match(/\d+(\.\d+)?%?/g) || [];
		if (c.length < 3) return '';
		c = c.slice(0, 3);
		while (i < 3) {
			tem = c[i];
			if (tem.indexOf('%') != -1) {
				tem = Math.round(parseFloat(tem) * 2.55);
			} else tem = parseInt(tem);
			if (tem < 0 || tem > 255) c.length = 0;
			else c[i++] = tem.toString(16).padZero(2);
		}
		if (c.length == 3) return '#' + c.join('').toLowerCase();
		return '';
	}
}

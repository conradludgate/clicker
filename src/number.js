// Add more
const endings = [
	"thousand", "million", "billion", "trillion", 
	"quadrillion", "quintillion", "sextillion", "septillion", 
	"octillion", "nonillion", "decillion", "undecillion",
	"duodecillion", "tredecillion", "quattourdecillion", "quindecillion",
	"sexdicillion"]

// const short_endings = ["k", "m", "b", "t", "q"]

function format_number(n, prefix="$", precision=0, format_ending = (s) => " " + s) {
	// Don't want to deal with negative numbers
	if (n < 0) {
		return "-" + format_number(-n)
	}

	// Truncate at precision
	n = Math.floor(n * Math.pow(10, precision)) / Math.pow(10, precision)

	if (n < 1000) {
		return prefix + n.toString()
	} else if (n < 1000000) {
		return prefix + Math.floor(n / 1000).toString() + "," + (n % 1000).toString().padStart(3, '0')
	}

	let power = Math.floor(Math.log10(n) / 3) - 1

	n = Math.floor(n / Math.pow(1000, power))

	let ending = "E+" + (power * 3).toString()
	if (power < endings.length) {
		ending = format_ending(endings[power])
	}

	return prefix + Math.floor(n / 1000).toString() + "." + (n % 1000).toString().padStart(3, '0') + ending
}

export default format_number
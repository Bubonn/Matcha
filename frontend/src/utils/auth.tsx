export function createCookie(name: string, value: string) {
	document.cookie = name + "=" + value + "; SameSite=None; secure; path=/";
}

export function deleteCookie(name: string) {
	// eslint-disable-next-line
	document.cookie = name + "=" + '; SameSite=None; secure; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
}

export function getCookieByName(name: string) {
	name = name + "=";
	var list = document.cookie.split(';');
	for (var i = 0; i < list.length; i++) {
		var c = list[i];
		while (c.charAt(0) === ' ') {
			c = c.substring(1, c.length);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

export function parseJwt (token: string) {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
}

export function getToken() {
	const token: string | null = getCookieByName('token');

	if (!token) {
		return null;
	}
	return token;
}

function containsUpperCase(str: string) {
	const regex = /[A-Z]/;
	return regex.test(str);
}

function containsSpecialCharacter(str: string) {
	const regex = /[!@#$%^&*()_+{}[\]:;<>,.?~\\|]/;
	return regex.test(str);
}

function containsDigit(str: string) {
	const regex = /\d/;
	return regex.test(str);
}

// eslint-disable-next-line
export function checkPassword(password: string, confPassword: string, setErr: any) {
	// setBackErr('');
	if (!password && !confPassword) {
		return setErr('');
	}
	if (password.length < 8) {
		return setErr('Password must contain at least eight characters');
	}
	if (!containsUpperCase(password)) {
		return setErr('Password must contain at least one uppercase character');
	}
	if (!containsSpecialCharacter(password)) {
		return setErr('Password must contain at least one special character');
	}
	if (!containsDigit(password)) {
		return setErr('Password must contain at least one digit');
	}
	if (password !== confPassword) {
		return setErr('The two passwords must be the same');
	}
	setErr('');
}
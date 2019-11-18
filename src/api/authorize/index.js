import { FETCH } from "../fetch"
const INIT = {
	method: 'GET',
	mode: 'cors'
}
export function GetAuthorize() {
	return FETCH(
		'https://reqres.in/api/users',
		INIT
	)
}

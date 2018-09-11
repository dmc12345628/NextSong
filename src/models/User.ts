export class User {
	public active: boolean;
	public connected: string;
	public meeting: string;
	public nickname: string;

	constructor() {
		this.active = null;
		this.connected = (new Date()).getCompleteDateTime();
		this.meeting = '';
		this.nickname = '';
	}
}
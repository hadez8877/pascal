interface UserOptions {
	name: string;
	location?: string;

	birthDate: number;
	deathDate: number;
}

/**
 * User class
 */
class User implements UserOptions {
	public name: string;
	public location?: string;

	public readonly birthDate: number;
	public readonly deathDate: number;

	constructor(opts: UserOptions) {
		this.name = opts.name;
		this.location = opts.location;
		this.birthDate = opts.birthDate;
		this.deathDate = opts.deathDate;
	}

	getAge(): number {
		return this.deathDate - this.birthDate;
	}
}

const user = new User({
	name: 'Pedro',
	birthDate: 1990,
	deathDate: 2026
});

// biome-ignore lint/suspicious/noConsole: example file
console.log(`Hi, ${user.name}! You are ${user.getAge()} years old.`);

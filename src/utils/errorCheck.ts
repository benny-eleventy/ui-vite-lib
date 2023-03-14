export function checkConditions(conditions: any[]) {
	const messages: any[] = [];

	conditions.forEach((c: { condition: any; message: any }) => {
		const { condition, message } = c;
		if (condition) {
			messages.push(message);
		}
	});

	if (messages.length > 0) {
		throw new Error(messages.join("\n"));
	}
	return messages;
}

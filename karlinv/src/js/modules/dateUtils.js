import { format } from 'date-fns';

export function getCurrentTime() {
	return format(new Date(), 'HH:mm');
}

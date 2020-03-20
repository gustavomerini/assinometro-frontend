import { Subscription } from '../../subscription/subscription';

export interface User {
    username: string;
    password: string;
    id?: string;
    subscriptions?: Subscription[];
}
import { v4 as uuidv4 } from "uuid";
import { User } from '$lib/server/models/User';
import { Session } from "$lib/server/models/Session";
import { Item } from "$lib/server/models/Item";
import { List } from "$lib/server/models/List";

export const SESSION_COOKIE_NAME = 'session-id';

// HELPER FUNCTIONS //
export function validateUsername(username: string): boolean {
    return username.length >= 3 && /^[a-zA-Z0-9_]*$/.test(username);
}

export function validateEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePassword(password: string): boolean {
    const passwordLength = password.length > 7 && password.length < 33;
    const allowedSpecials = /^[\w@!#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
    const hasNoWeirdCharacters = allowedSpecials.test(password);
    return passwordLength && hasNoWeirdCharacters;
}

// SESSION FUNCTIONS //
export async function createSession(userId: string) {
    try {
        let newSessionId = uuidv4();

        // SQL: SELECT * FROM sessions WHERE sessionId = newSessionId LIMIT 1;
        const sessionIdFound = await Session.findOne({ where: { sessionId: newSessionId } });
        if (sessionIdFound) {
            newSessionId = uuidv4();
        }

        // SQL: DELETE FROM sessions WHERE userId = userId;
        await Session.destroy({ where: { userId } });

        // SQL: INSERT INTO sessions (sessionId, userId) VALUES (newSessionId, userId);
        const newSession = await Session.create({
            sessionId: newSessionId,
            userId
        });

        return (newSession as any).sessionId;
    } catch (error) {
        console.error('Error creating session:', error);
        throw error;
    }
}

export async function validateSession(sessionId: string) {
    try {
        // SQL: SELECT * FROM sessions WHERE sessionId = sessionId LIMIT 1;
        const sessionFound = await Session.findOne({ where: { sessionId } });
        if (!sessionFound) {
            return [false, '', ''];
        }

        // SQL: SELECT * FROM users WHERE id = sessionFound.userId LIMIT 1;
        const userFound = await User.findOne({ where: { id: (sessionFound as any).userId } });
        if (!userFound) {
            return [false, '', ''];
        }

        return [true, userFound.dataValues.id.toString(), userFound.dataValues.username.toString()];
    } catch (error) {
        console.error('Error validating session:', error);
        throw error;
    }
}

export async function removeSession(sessionId: string) {
    try {
        // SQL: DELETE FROM sessions WHERE sessionId = sessionId;
        const result = await Session.destroy({ where: { sessionId } });
        if (result === 0) {
            console.warn(`No session found with sessionId: ${sessionId}`);
        } else {
            console.log(`Session with sessionId: ${sessionId} removed successfully.`);
        }
    } catch (error) {
        console.error('Error removing session:', error);
        throw error;
    }
}

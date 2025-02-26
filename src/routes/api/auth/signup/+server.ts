import { json } from '@sveltejs/kit';
import { User } from '$lib/server/models/User';
import { 
  validateUsername, 
  validateEmail, 
  validatePassword,
  createSession,
  SESSION_COOKIE_NAME
} from '$lib/auth/auth.server';
import bcrypt from "bcrypt";
import { serialize } from 'cookie';

const emailError = 'Ugyldig e-postadresse';
const usernameOrPasswordError = 'Ugyldig brukernavn eller passord';
const usernameInPasswordError = 'Passordet skal ikke inneholde brukernavnet';

export async function POST({ request }) {
  const { username, email, password } = await request.json();

  if (!validateEmail(email)) {
    return json({ error: emailError }, { status: 400 });
  }
  const existingUserByEmail = await User.findOne({ where: { email } });
  if (existingUserByEmail) return json({ error: emailError }, { status: 400 });

  if (!validateUsername(username)) {
    return json({ error: usernameOrPasswordError }, { status: 400 });
  }
  const existingUserByUsername = await User.findOne({ where: { username } });
  if (existingUserByUsername) return json({ error: usernameOrPasswordError }, { status: 400 });

  if (!validatePassword(password)) {
    return json({ error: usernameOrPasswordError }, { status: 400 });
  }

  if (password.includes(username)) {
    return json({ error: usernameInPasswordError }, { status: 400 });
  }

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, email, passwordHash });
  
    const sessionId = await createSession(newUser.id.toString());
    const cookie = serialize(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/'
    });

    return new Response(JSON.stringify({ success: true, userId: newUser.id, username: newUser.username }), {
      status: 200,
      headers: {
          'Set-Cookie': cookie,
          'Content-Type': 'application/json'
      }
    });
  } catch (err) {
    return json({ error: 'Feil ved opprettelse av konto' }, { status: 500 });
  }
}

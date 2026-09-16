import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "goshtghar_secure_admin_secret_key_2026";
const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "goshtghar123";

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return user === ADMIN_USER && pass === ADMIN_PASS;
}

export function generateAdminToken(): string {
  return jwt.sign({ role: "admin", username: ADMIN_USER }, JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): boolean {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as any;
    return decoded && decoded.role === "admin";
  } catch (err) {
    return false;
  }
}

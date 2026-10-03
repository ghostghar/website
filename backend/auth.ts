import jwt from "jsonwebtoken";

const PRIMARY_SECRET = process.env.JWT_SECRET || "goshtghar-jwt-secret-key-2026";
const KNOWN_SECRETS = Array.from(
  new Set([
    PRIMARY_SECRET,
    "goshtghar-jwt-secret-key-2026",
    "goshtghar_secure_admin_secret_key_2026",
  ])
);

const ADMIN_USER = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "goshtghar123";

export function verifyAdminCredentials(user: string, pass: string): boolean {
  return user === ADMIN_USER && pass === ADMIN_PASS;
}

export function generateAdminToken(): string {
  return jwt.sign({ role: "admin", username: ADMIN_USER }, PRIMARY_SECRET, {
    expiresIn: "30d",
  });
}

export function verifyToken(token: string): boolean {
  if (!token) return false;
  for (const secret of KNOWN_SECRETS) {
    try {
      const decoded = jwt.verify(token, secret) as any;
      if (decoded && decoded.role === "admin") {
        return true;
      }
    } catch {
      // Continue to next candidate secret
    }
  }
  return false;
}


import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// In a real app we'd inject the Users repository here
// For the MVP stub we'll mock the DB

const MOCK_DB: any[] = [];

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = MOCK_DB.find(u => u.email === email);
    if (user && await bcrypt.compare(pass, user.passwordHash)) {
      const { passwordHash, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(email: string, pass: string) {
    const passwordHash = await bcrypt.hash(pass, 10);
    const newUser = { id: Math.random().toString(36).substr(2, 9), email, passwordHash, role: 'OWNER' };
    MOCK_DB.push(newUser);
    return this.login(newUser);
  }
}

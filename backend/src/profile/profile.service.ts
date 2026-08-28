import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

/// The card describes one person, so every read is unscoped: there is a single
/// profile at id 1 and the child tables belong to it implicitly.
const PROFILE_ID = 1;

@Injectable()
export class ProfileService {
  constructor(private readonly prisma: PrismaService) {}

  findProfile() {
    return this.prisma.profile.findUnique({ where: { id: PROFILE_ID } });
  }

  findSkills() {
    return this.prisma.skill.findMany({ orderBy: { position: 'asc' } });
  }

  findProjects() {
    return this.prisma.project.findMany({ orderBy: { position: 'asc' } });
  }

  findLinks() {
    return this.prisma.contactLink.findMany({ orderBy: { position: 'asc' } });
  }
}

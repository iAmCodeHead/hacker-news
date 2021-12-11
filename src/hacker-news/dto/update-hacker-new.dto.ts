import { PartialType } from '@nestjs/mapped-types';
import { CreateHackerNewDto } from './create-hacker-new.dto';

export class UpdateHackerNewDto extends PartialType(CreateHackerNewDto) {}

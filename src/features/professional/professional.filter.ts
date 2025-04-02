import { ApiProperty } from '@nestjs/swagger';

export class ProfessionalFilter {
    @ApiProperty({ required: false, type: String })
    name: string;

    @ApiProperty({ required: false, type: String })
    email: string;

    @ApiProperty({ required: false, type: String })
    phone: string;

    @ApiProperty({ required: false, type: String })
    specialty: string;
}

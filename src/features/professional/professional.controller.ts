import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Query,
    Body,
} from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { Professional } from 'src/models/professional.entity';
import { PageParams, PageList } from 'src/shared/pagination';
import { ProfessionalFilter } from './professional.filter';
import { ProfessionalDto } from './professional.dto';

@Controller('professionals')
export class ProfessionalController {
    constructor(private readonly professionalService: ProfessionalService) { }

    @Get()
    async get(@Query() pageParams: PageParams, @Query() filter: ProfessionalFilter): Promise<PageList<Professional>> {
        return this.professionalService.get(pageParams, filter);
    }

    @Get(':id')
    async getById(@Param('id') id: number): Promise<Professional> {
        return this.professionalService.getById(id);
    }

    @Post()
    async create(@Body() body: ProfessionalDto): Promise<Professional> {
        return this.professionalService.create(body as Professional);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() body: ProfessionalDto): Promise<Professional> {
        return this.professionalService.update(id, body as Professional);
    }

    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        return this.professionalService.delete(id);
    }
}

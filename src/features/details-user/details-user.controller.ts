import { DetailsUserService } from './details-user.service';
import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('details-user')
@ApiTags('details-students')
export class DetailsUserController {
  constructor(private detailsUserService: DetailsUserService) {}

  @Get(':detailsId')
  @ApiOperation({ summary: 'get details of a student' }) // Documenta la ruta
  @ApiResponse({ status: 201, description: 'data collected' })
  async getDetailsUser(@Param('detailsId') detailsId: string) {
    return this.detailsUserService.getDetailsStudent(detailsId);
  }
  // @Post()
  // @ApiOperation({ summary: 'get details of a student' }) // Documenta la ruta
  // @ApiResponse({ status: 201, description: 'data collected' })
  // async editDetailsStudent(@Body() detailsBody) {
  //   return this.detailsUserService.editDetailsStudent(detailsBody);
  // }
}

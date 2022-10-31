import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete, Req, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { I18n, I18nContext } from 'nestjs-i18n';
import { ResponseDto } from '../../dtos/response.dtp';
import { UserRoles } from '../../enums/userRoles.enum';
import { Role } from '../../guards/roles.decorator';
import { Coins } from '../../models/coins.model';

import { CoinsService } from './coins.service';



@ApiTags('Coins')
@Controller('Coins')
export class CoinsController {

    constructor(private service: CoinsService) { }
    
    /* End of Coins Controller Class 
   */
}
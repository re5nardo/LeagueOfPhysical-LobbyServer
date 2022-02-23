import { IsString } from 'class-validator';

export class CreateUserMatchDto {
  @IsString()
  public state: string;

  @IsString()
  public stateValue: string;

  @IsString()
  public matchmakingTicketId: string;
}

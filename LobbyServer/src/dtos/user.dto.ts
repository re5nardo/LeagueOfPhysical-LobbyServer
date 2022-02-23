import { IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  public nickname: string;
}

// var userInfoSchema = new Schema({
//   userId: String,
//   nickname: { type: String, default: '' },
//   masterExp: { type: Number, default: 0 },
//   friendlyRating: { type: Number, default: 1500 },
//   rankRating: { type: Number, default: 1500 },
//   goldCoin: { type: Number, default: 100 },
//   gem: { type: Number, default: 10 }
// });


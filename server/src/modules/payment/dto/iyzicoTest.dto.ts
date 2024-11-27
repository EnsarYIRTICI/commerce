import { ApiProperty } from '@nestjs/swagger';

export class IyzicoTestDto {
  @ApiProperty({ example: 'tr', description: 'The locale of the request' })
  locale?: string;

  @ApiProperty({ example: '12345', description: 'The unique conversation ID' })
  conversationId?: string;
}

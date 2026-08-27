import { Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { ApiStatus } from './models/api-status.model';

@Resolver(() => ApiStatus)
export class AppResolver {
  constructor(private readonly appService: AppService) {}

  @Query(() => ApiStatus, { description: 'Basic liveness info about the API.' })
  status(): ApiStatus {
    return {
      message: this.appService.getHello(),
      timestamp: new Date(),
    };
  }
}

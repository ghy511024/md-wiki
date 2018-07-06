import {Module} from '@nestjs/common';
import {PageController} from './controller/page.controller';

@Module({
    imports: [],
    controllers: [PageController],
    components: [],
})

export class AppModule {
}

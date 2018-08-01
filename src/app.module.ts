import {Module} from '@nestjs/common';
import {PageController} from './controller/pageController';
import {SpaceController} from './controller/spaceController';

@Module({
    imports: [],
    controllers: [PageController,SpaceController],
    components: [],
})

export class AppModule {
}

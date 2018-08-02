import {Module} from '@nestjs/common';
import {PageController} from './controller/pageController';
import {SpaceController} from './controller/spaceController';
import {GitProController} from './controller/gitProController';

@Module({
    imports: [],
    controllers: [PageController, SpaceController, GitProController],
    components: [],
})

export class AppModule {
}

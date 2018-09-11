import {Module} from '@nestjs/common';
import {PageController} from './controller/pageController';
import {SpaceController} from './controller/spaceController';
import {GitProController} from './controller/gitProController';
import {DocController} from './controller/docController';

@Module({
    imports: [],
    controllers: [PageController, SpaceController, GitProController, DocController],
    components: [],
})

export class AppModule {
}

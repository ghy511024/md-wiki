import {Module} from '@nestjs/common';
import {PageController} from './controller/pageController';
import {SpaceController} from './controller/spaceController';
import {GitProController} from './controller/gitProController';
import {DocController} from './controller/docController';
import {ViewController} from './controller/viewController';

@Module({
    imports: [],
    controllers: [PageController, SpaceController, GitProController, ViewController],
    components: [],
})

export class AppModule {
}

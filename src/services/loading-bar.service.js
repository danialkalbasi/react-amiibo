import { EventEmitter } from 'events';
import { LOADING_BAR } from '../constants';

export default class LoadingBarService {
    static loadingBarEmitter;
    static numberOfTasks;

    constructor() {
        if (!LoadingBarService.loadingBarEmitter) {
            LoadingBarService.numberOfTasks = 0;
            LoadingBarService.loadingBarEmitter = new EventEmitter();
        }
    }

    enqueue() {
        LoadingBarService.numberOfTasks += 1;
        LoadingBarService.loadingBarEmitter.emit(LOADING_BAR.LISTENER_NAME, true);
    }

    dequeue() {
        if (LoadingBarService.numberOfTasks >= 0) {
            LoadingBarService.numberOfTasks -= 1;
        }
        if (LoadingBarService.numberOfTasks === 0) {
            setTimeout(() => {
                LoadingBarService.loadingBarEmitter.emit(LOADING_BAR.LISTENER_NAME, false);
            }, LOADING_BAR.END_DELAY);
        }
    }
    isLoading(fn) {
        LoadingBarService.loadingBarEmitter.addListener(LOADING_BAR.LISTENER_NAME, fn);
    }
}

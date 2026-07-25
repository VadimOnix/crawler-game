// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { preloadImages } from './preloadImages';

/**
 * jsdom не грузит ресурсы, а `new Image()` не попадает в документ, поэтому
 * подменяем конструктор: так тест держит ссылки на созданные картинки
 * и сам решает, когда каждая из них «загрузилась».
 */
class FakeImage {
    onload: (() => void) | null = null;
    onerror: (() => void) | null = null;
    decode?: () => Promise<void>;

    set src(_value: string) {
        created.push(this);
    }
}

let created: FakeImage[] = [];

const withDecode = () => {
    for (const image of created) {
        image.decode = () => Promise.resolve();
    }
};

describe('preloadImages', () => {
    beforeEach(() => {
        created = [];
        vi.useFakeTimers();
        vi.stubGlobal('Image', FakeImage);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });

    it('резолвится по таймауту, если картинка так и не загрузилась', async () => {
        // главное свойство: медленная сеть портит вид, но не запирает
        // игрока в прелоадере навсегда
        const pending = preloadImages(['never-loads.png'], 100);

        await vi.advanceTimersByTimeAsync(100);

        await expect(pending).resolves.toBeUndefined();
    });

    it('резолвится, когда все картинки загрузились', async () => {
        const pending = preloadImages(['a.png', 'b.png'], 10_000);
        expect(created).toHaveLength(2);

        for (const image of created) {
            image.onload?.();
        }

        await expect(pending).resolves.toBeUndefined();
    });

    it('ждёт декодирования там, где оно поддерживается', async () => {
        const pending = preloadImages(['a.png'], 10_000);
        withDecode();

        for (const image of created) {
            image.onload?.();
        }

        await expect(pending).resolves.toBeUndefined();
    });

    it('не считает битую картинку поводом остановить загрузку', async () => {
        const pending = preloadImages(['broken.png', 'ok.png'], 10_000);

        created[0].onerror?.();
        created[1].onload?.();

        await expect(pending).resolves.toBeUndefined();
    });

    it('не резолвится, пока загрузилась только часть картинок', async () => {
        const settled = vi.fn();
        preloadImages(['a.png', 'b.png'], 10_000).then(settled);

        created[0].onload?.();
        await vi.advanceTimersByTimeAsync(0);

        expect(settled).not.toHaveBeenCalled();
    });
});

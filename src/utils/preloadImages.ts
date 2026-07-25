/** Сколько ждём картинки, прежде чем пустить игрока дальше без них. */
const DEFAULT_TIMEOUT_MS = 8000;

/**
 * Дожидается загрузки (и, где поддерживается, декодирования) одной картинки.
 * Ошибка загрузки не считается фатальной: промис всё равно резолвится,
 * иначе один битый файл заблокировал бы вход в игру.
 */
const preloadImage = (src: string): Promise<void> =>
    new Promise((resolve) => {
        const image = new Image();
        const done = () => resolve();
        image.onload = () => {
            // decode() убирает подвисание на первом кадре отрисовки
            if (typeof image.decode === 'function') {
                image.decode().then(done, done);
                return;
            }
            done();
        };
        image.onerror = done;
        image.src = src;
    });

/**
 * Прогревает браузерный кеш перед показом первого экрана.
 * Всегда резолвится: по завершении загрузки всех картинок либо по таймауту,
 * чтобы медленная сеть приводила к «некрасиво», а не к «навсегда в прелоадере».
 */
export const preloadImages = (sources: string[], timeoutMs = DEFAULT_TIMEOUT_MS): Promise<void> => {
    const loaded = Promise.all(sources.map(preloadImage)).then(() => undefined);
    const timedOut = new Promise<void>((resolve) => {
        setTimeout(resolve, timeoutMs);
    });
    return Promise.race([loaded, timedOut]);
};

export default preloadImages;

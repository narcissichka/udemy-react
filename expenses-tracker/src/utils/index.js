export function handleEvent(handler, ...rest) {
    return function (e) {
        handler(e, ...rest);
    };
}
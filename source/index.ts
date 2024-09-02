export type Nextable = Generator | AsyncGenerator;

export type Middleware =
    | AsyncGeneratorFunction
    | GeneratorFunction
    | ((...data: any[]) => any | Promise<any>);

const { push, [Symbol.iterator]: iterator } = Array.prototype;

export default class OnionStack {
    length = 0;

    [index: number]: Middleware;

    constructor(...list: Middleware[]) {
        for (const middleware of list) this.use(middleware);
    }

    use(middleware: Middleware) {
        push.call(this, middleware);

        return this;
    }

    [Symbol.iterator] = iterator;

    mount(stack: OnionStack) {
        return this.use(() => stack.execute());
    }

    async execute(...data: any[]) {
        const nextStack: Nextable[] = [];

        for (const middleware of Array.from<Middleware>(this)) {
            const result = middleware(...data);

            if (
                typeof result?.[Symbol.iterator] === 'function' ||
                typeof result?.[Symbol.asyncIterator] === 'function'
            ) {
                await (result as Nextable).next();

                nextStack.push(result);
            } else {
                if (result instanceof Promise) await result;

                break;
            }
        }
        for (let item: Nextable; (item = nextStack.pop()); ) await item.next();
    }
}

export type Middleware =
    | AsyncGeneratorFunction
    | GeneratorFunction
    | ((...data: any[]) => any | Promise<any>);

const { push, [Symbol.iterator]: iterator } = Array.prototype;

export default class OnionStack {
    length = 0;
    cursor = 0;

    [index: number]: Middleware;

    constructor(...list: Middleware[]) {
        for (const middleware of list) this.use(middleware);
    }

    use(middleware: Middleware) {
        push.call(this, middleware);

        return this;
    }

    [Symbol.iterator]() {
        return iterator.call(this);
    }

    mount(stack: OnionStack) {
        return this.use(() => stack.execute());
    }

    async execute(...data: any[]) {
        const middleware = this[this.cursor];

        const { next } = middleware?.() || {};

        if (typeof next !== 'function') return;

        await next();

        if (this.cursor < this.length)
            try {
                this.cursor++;

                await this.execute(...data);

                await next();
            } catch (error) {
                this.cursor = 0;

                throw error;
            }
        else this.cursor = 0;
    }
}

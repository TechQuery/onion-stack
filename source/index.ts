export type Middleware = AsyncGenerator | Generator | Function;

const { push, [Symbol.iterator]: iterator } = Array.prototype;

export default class OnionStack {
    length = 0;
    cursor = 0;

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
        return this.use(this.execute.bind(stack));
    }

    async execute(...data: any[]) {
        const middleware = this[this.cursor];

        const { next } =
            (middleware() as AsyncIterator<any> | Iterator<any>) || {};

        if (next instanceof Function) await next();

        if (this.cursor < this.length - 1)
            try {
                this.cursor++;

                await this.execute(...data);

                if (next instanceof Function) await next();
            } catch (error) {
                this.cursor = 0;

                throw error;
            }
        else this.cursor = 0;
    }
}

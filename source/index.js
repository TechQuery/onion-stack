export default class OnionStack extends Array {
    /**
     * @param  {...Function} middleware
     */
    constructor(...middleware) {
        super(...middleware).last = -1;
    }

    /**
     * @protected
     *
     * @param {Function} func
     * @param {?Array}   parameter
     */
    async exec(func, parameter) {
        const iterator = func.apply(null, parameter);

        if (!((iterator || '').next instanceof Function)) return;

        await iterator.next();

        await this.execute.apply(this, parameter);

        const { done } = await iterator.next();

        if (!done)
            console.warn('Only one `yield` is made sense in a Middleware');
    }

    /**
     * @param {...*} parameter
     */
    async execute(...parameter) {
        const middleware = this[++this.last];

        try {
            if (middleware instanceof OnionStack)
                await middleware.execute.apply(middleware, parameter);
            else if (middleware instanceof Function)
                await this.exec(middleware, parameter);
        } catch (error) {
            this.last--;

            throw error;
        }

        this.last--;
    }
}

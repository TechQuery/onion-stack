export default class MiddleStack extends Array {
    /**
     * @param  {...Function} middleware
     */
    constructor(...middleware) {
        super(...middleware).last = -1;
    }

    /**
     * @param {...*} parameter
     */
    async execute(...parameter) {
        const func = this[++this.last];

        if (func)
            try {
                const iterator = func.apply(null, parameter);

                if ((iterator || '').next instanceof Function) {
                    await iterator.next();

                    await this.execute.apply(this, parameter);

                    const { done } = await iterator.next();

                    if (!done)
                        console.warn(
                            'Only one `yield` is made sense in a Middleware'
                        );
                }
            } catch (error) {
                this.last--;

                throw error;
            }

        this.last--;
    }
}

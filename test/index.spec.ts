import OnionStack from '../source';

const delay = (seconds = 1) =>
    new Promise(resolve => setTimeout(resolve, seconds * 1000));

function createExample() {
    const list: number[] = [];

    const stack_list = [
        function* () {
            list.push(1);

            yield;

            list.push(2);

            yield;

            list.push(3);
        },
        async function* () {
            await delay(0.1);

            list.push(4);

            yield;

            list.push(5);
        },
        function () {
            list.push(6);
        }
    ];
    return { list, stack_list };
}

/**
 * @test {OnionStack}
 */
describe('Middleware callstack', () => {
    /**
     * @test {OnionStack#execute}
     */
    it('Execute normally', async () => {
        const { stack_list, list } = createExample();
        const stack = new OnionStack(...stack_list);

        await stack.execute();

        expect(list).toEqual([1, 4, 6, 5, 2]);
    });

    /**
     * @test {OnionStack#exec}
     */
    it('Execute abnormally', async () => {
        const { stack_list, list } = createExample();

        stack_list[1] = async function* () {
            await delay(0.1);

            list.push(4);

            yield;

            throw Error('test');
        };

        const stack = new OnionStack(...stack_list);

        try {
            await stack.execute();
        } catch (error) {
            expect(error).toStrictEqual(Error('test'));
        }
        expect(list).toEqual([1, 4, 6]);
    });

    /**
     * @test {OnionStack#execute}
     */
    it('Nested stack', async () => {
        const { stack_list, list } = createExample();

        const stack = new OnionStack(...stack_list.slice(0, 2))
            .mount(new OnionStack(...stack_list))
            .use(stack_list[2]);

        await stack.execute();

        expect(list).toEqual([1, 4, 1, 4, 6, 5, 2, 5, 2]);
    });
});

import MiddleStack from '../source';

function delay(seconds) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}

var list = [],
    stack = [
        function*() {
            list.push(1);

            yield;

            list.push(2);

            yield;

            list.push(3);
        },
        async function*() {
            await delay(0.1);

            list.push(4);

            yield;

            list.push(5);
        },
        function() {
            list.push(6);
        }
    ];

/**
 * @test {MiddleStack}
 */
describe('Call stack', () => {
    /**
     * @test {MiddleStack#execute}
     */
    it('Execute normally', async () => {
        stack = MiddleStack.from(stack);

        await stack.execute();

        list.should.be.eql([1, 4, 6, 5, 2]);

        stack.last.should.be.equal(-1);
    });

    /**
     * @test {MiddleStack#execute}
     */
    it('Execute abnormally', async () => {
        list.length = 0;

        stack[1] = async function*() {
            await delay(0.1);

            list.push(4);

            yield;

            throw Error('test');
        };

        await stack.execute().should.be.rejectedWith(Error('test'));

        list.should.be.eql([1, 4, 6]);

        stack.last.should.be.equal(-1);
    });
});

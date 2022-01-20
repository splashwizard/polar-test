/**
 * Implement a class named ring buffer with fixed capacity such that
 *
 * constructor: takes the capacity for the ring buffer
 *
 * push: adds a value to the ring buffer.
 * pop: removes the last value from the ring buffer or undefined if it's empty.
 * peek: returns the current value of the most recent value added or undefined if none have been added
 *
 * If we have too many values (exceeding capacity) the oldest values are lost.
 *
 * The ordering of the push operations must be kept.
 */
export class RingBuffer<T> {
    data:Array<any>;
    capacity: Number;
    constructor(capacity: number) {
        this.data = [];
        this.capacity = capacity;
    }

    public push(value: T) {
        if(this.data.length === this.capacity) {
            this.data = this.data.slice(1);
        }
        this.data.push(value);
    }

    public peek(): T | undefined {
        if(this.data.length > 0) return this.data[this.data.length - 1];
        // not implemented
        return undefined;
    }

    public pop(): T | undefined {
        if(this.data.length > 0) {
            const popedElement = this.data[this.data.length - 1];
            this.data = this.data.slice(0, this.data.length - 1);
            return popedElement;
        }
        // not implemented
        return undefined;
    }

}

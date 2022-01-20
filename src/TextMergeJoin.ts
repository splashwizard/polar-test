/**
 * In our app we have regions of text that may or not be contiguous.
 *
 * The text is given back as rectangles with x, y, width, and height properties.
 *
 * If the x, y, width, and height are close enough, we can assume they're the same word.
 *
 * Sometimes our rectangles are word fragments NOT the whole word so we need to join the words
 * again to form entire sentences.
 *
 * The test data has examples of what these partial regions would look like.
 */
export namespace TextMergeJoin {

    export interface IPDFTextWord {
        readonly pageNum: number;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly str: string;
    }


    /**
     *
     */
    export function doMergeWords(data: ReadonlyArray<IPDFTextWord>): ReadonlyArray<IPDFTextWord> {
        const result: Array<IPDFTextWord> = [];
        let mergedIndexes: Array<Number> = [];
        for(let i = 0; i < data.length; i ++) {
            const itemI = data[i];
            let merged = false;
            if(mergedIndexes.indexOf(i) === -1) {
                for(let j = i + 1; j < data.length; j ++) {
                    if(mergedIndexes.indexOf(j) === -1) {
                        const itemJ = data[j];
                        if(itemI.y === itemJ.y && itemI.height === itemJ.height) {
                            if(itemI.x > itemJ.x && Math.abs(itemI.x - itemJ.x - itemJ.width) < 1) {
                                result.push({
                                    pageNum: itemJ.pageNum,
                                    x: itemJ.x,
                                    y: itemI.y,
                                    width: itemI.width + itemJ.width,
                                    height: itemI.height,
                                    str: itemJ.str + itemI.str,
                                });
                                mergedIndexes.push(j);
                                merged = true;
                                break;
                            } 
                            else if(itemI.x < itemJ.x && Math.abs(itemJ.x - itemI.x - itemI.width) < 1) {
                                result.push({
                                    pageNum: itemJ.pageNum,
                                    x: itemI.x,
                                    y: itemI.y,
                                    width: itemI.width + itemJ.width,
                                    height: itemI.height,
                                    str: itemI.str + itemJ.str,
                                });
                                mergedIndexes.push(j);
                                merged = true;
                                break;
                            }
                        }
                    }
                }
            }
            if (!merged) {
                result.push(itemI);
            }
        }
        return result;
        // return [];
    }

}

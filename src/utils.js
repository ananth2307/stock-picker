import { DIFF } from "./constants";
export const filteredData = (data, diff=DIFF) => {
    let result = [];
    data && data.map(dt => {
        if(dt.open === dt.high) {
            result.push({...dt, status: 'SELL'})
        }
        else if(dt.open === dt.low) {
            result.push({...dt, status: 'BUY'})
        }
    })
    return result;
}
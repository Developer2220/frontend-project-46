const makeAstTree = (obj1, obj2) => {
    const allKeys = _.union(Object.entries(parsedData1), Object.entries(parsedData2))
        console.log(allKeys)
        const sortedAllKeys = _.sortBy(allKeys)
        console.log(sortedAllKeys)
    
    // const arr1 = Object.entries(parsedData1)
    // console.log(arr1)
    // const arr2 = Object.entries(parsedData2)
    // console.log(arr2)
    // const result = '';
    // for (let i = 0; i < sortedAllKeys.length; i++) {
    //   if (arr1[i] === arr2[i]) {
    //     return 
    //   }
    // }
    
    
    
    
    
    const result1 = {};
    const result2 = {};
    const result3 = {};
    const result4 = {};
    
    for (const [key, value] of allKeys) {
    
      if (Object.hasOwn(parsedData1, key) && Object.hasOwn(parsedData2, key) && parsedData1[key] === parsedData2[key] ) {
        result1.status = 'unchanged' 
        result1[key] = value
      } 
      if (Object.hasOwn(parsedData1, key) && !Object.hasOwn(parsedData2, key) ) {
        result2.status = 'deleted' 
        result2[key] = value
      } 
      if (!Object.hasOwn(parsedData1, key) && Object.hasOwn(parsedData2, key) ) {
        result3.status = 'added' 
        result3[key] = value
      } 
      if (Object.hasOwn(parsedData1, key) && Object.hasOwn(parsedData2, key) && parsedData1[key] !== parsedData2[key]) {
        result4.status = 'changed' 
        result4[key] = value
      } 
      
    }
    const res = [result1, result2, result3, result4]
    return res
    }
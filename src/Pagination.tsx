import React, {useEffect, useState} from 'react';
import { PaginationComponent} from './models/models';


const Pagination = ({page, count, goToPage}: PaginationComponent):JSX.Element => {
    const [pagesArray, setPages] = useState<number[][]>([[]]);
    
    useEffect(() => {
        const numberPages = Math.ceil(count/6);
        if(numberPages > 0) {
            const numArrays: number[][] = [[1,2,3,4,5,6]];
            for(let i = 1; i < numberPages; i++) {
                const sum: number[] = [];
                numArrays[numArrays.length - 1].forEach(num=> {
                    sum.push(num+6)
                });
                numArrays.push(sum);
            }   
            setPages(numArrays)
        }
    },[])  
   
    return (
        <>
         {(pagesArray.length > 1) &&
            pagesArray.map((arr, index) => {
                if(JSON.stringify(arr) === JSON.stringify(page) && (index >= 0 && index < 3) ) {
                    return (
                        <ul key={index} className="pagination text-white flex justify-center">
                        <li className="active text-active" onClick={() => goToPage(arr)}>{index+1}</li>
                        <li onClick={() => goToPage(pagesArray[index+1])}>{index+2}</li>
                        <li onClick={() => goToPage( pagesArray[index+2])}>{index+3}</li>
                        <li>...</li>
                        <li onClick={() => goToPage(pagesArray[pagesArray.length-1])}>{pagesArray.length}</li>
                        </ul>
                    ) 
                }
                else if(JSON.stringify(arr) === JSON.stringify(page) && (index >= 3 && index < pagesArray.length-3)) {
                    return (
                        <ul key={index} className="pagination text-white flex justify-center">
                        <li onClick={() => goToPage(pagesArray[0])}>1</li>
                        <li>...</li>
                        <li className="active text-active" onClick={() => goToPage(arr)}>{index+1}</li> 
                        <li onClick={() => goToPage(pagesArray[index+1])}>{index+2}</li>
                        <li onClick={() => goToPage(pagesArray[index+2])}>{index+3}</li>
                        <li>...</li>
                        <li onClick={() => goToPage(pagesArray[pagesArray.length-1])}>{pagesArray.length}</li>
                        </ul>
                    )
                } else if (JSON.stringify(arr) === JSON.stringify(page) && (index >= pagesArray.length-3 && index <= pagesArray.length-1)) {
                    return (
                        <ul key={index} className="pagination text-white flex justify-center">
                        <li onClick={() => goToPage(pagesArray[0])}>1</li>
                        <li>...</li>
                        <li className="active text-active" onClick={() => goToPage(arr)}>{index+1}</li> 
                        </ul>
                    )
                }
                
            })
        } 
        </>
    )  
}

export default Pagination;

import { getFinanceInfo } from '../services';
import {useCallback,useState} from 'react';
import { Finance } from "../types";
import { useAppDispatch } from './storehook';
import { financeSlice,productSlice } from '../slices';

interface FinanceHookReturnType {
    fetchFinanceData: (brand:string,cuc_code:string,period_code_introduction:number)=>Promise<void>;
    financeData: Finance[];    
    isLoading: boolean;
    error: Error | null;
  };
    
function useFinance(): FinanceHookReturnType{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<Error | null>(null);
    const [financeData,setFinanceData] = useState<Finance[]>([]);
    const dispatch=useAppDispatch();
    const {setFinances} = financeSlice.actions;
    const{updateProductByField}=productSlice.actions
    const fetchFinanceData = async (brand:string='',cuc_code:string='',period_code_introduction:number=0) => {
    
        setIsLoading(true);
        try {
            const financeData = await getFinanceInfo(brand,cuc_code,period_code_introduction);
            setFinanceData(financeData.financeList);
            //console.log(financeData);
            //return financeList;
            if(financeData.financeList.length!==0){
                dispatch(setFinances(financeData.financeList));
                dispatch(updateProductByField({field_name:'strategy_priority',value:financeData.strategy_priority}));
            }
        } catch (err:any) {
            setError(err);
            setFinanceData([]);
        //return [];
        } finally {
            setIsLoading(false);
        }
    };
    return { fetchFinanceData,financeData,isLoading, error };
}


export {useFinance}
  
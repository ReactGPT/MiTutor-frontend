import axios from 'axios';
import {services as ServicesProperties} from '../../config';
import { Finance } from '../types';

type ProductDetailResponse={
  financeList:Finance[];
  strategy_priority :string;
}

async function getFinanceInfo(brand:string='',cuc_code:string='',period_code_introduction:number=0):Promise<ProductDetailResponse>{
  
  try {
      const response = await axios({
          method: 'get',
          url: ServicesProperties.BaseUrl+'/product-detail'+`?brand=${brand}&cuc_code=${cuc_code}&period_code_introduction=${period_code_introduction}`,
          headers : ServicesProperties.Headers
      });
      if(response.data.success==="false"){
          return {financeList:[],strategy_priority:""};
      }
      const financeList: Finance[] = response.data.product_country_finance.map((item: any,index:number) => {
          return {
            id:index,
            country_code: item.country_code,
            period_code_introduction: item.period_code_introduction,
            period_code_discontinued: item.period_code_discontinued,
            regular_price: item.regular_price,
            special_price: item.special_price,
            promotion_price: item.promotion_price,
            main_price: item.main_price,
            magazine_price: item.magazine_price,
            cost_usd: item.cost_usd,
            cost_local_currency: item.cost_local_currency,
            pup_intro: item.pup_intro,
            pup_demo: item.pup_demo,
            pup_rest_year: item.pup_rest_year
          };
        });
      const strategy_priority = response.data.strategy_priority;   
      return {financeList:financeList,strategy_priority:strategy_priority};;
      
  } catch (err) {
    return {financeList:[],strategy_priority:""};
  }
}
export {getFinanceInfo}

import {test as baseTest} from '@playwright/test';
interface TestDataForOrder {
    username: string;
    password: string;
    productName: string;
};
export const customTest = baseTest.extend<{testDataForOrder:TestDataForOrder}>(
{
testDataForOrder :    {
    username : "celvarajan.m@gmail.com",
    password : "cQRjfsyErt4aA@z",
    productName:"ADIDAS ORIGINAL"
    
    }

}

)





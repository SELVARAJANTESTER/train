const base = require('@playwright/test');


exports.customtest = base.test.extend(
{
testDataForOrder :    {
    username : "celvarajan.m@gmail.com",
    password : "cQRjfsyErt4aA@z",
    productName:"ADIDAS ORIGINAL"
    
    }

}

)





import React from "react";
import { render } from "react-dom";


const holder = (
    <React.StrictMode>
        <div id="content-holder">
            <Page1  data="data"/>
        </div>
    </React.StrictMode>
);
const holder2 = (
    <React.StrictMode>
        <div id="content-holder">
            <Page2  data="data"/>
        </div>
    </React.StrictMode>
);


let plans = [];
for(let i = 0; i < 12; i++){plans.push(i)}
const options = [
    {"name":"Pre-approved amount", "value":"₦200,000", "index":1}, {"name":"Monthly Payment", "value":"₦105,000", "index":2},
    {"name":"Tenor", "value":"2 months", "index":3}
]

let cashed_data = {"month_count":0, "month_plan":0}


function Page1() {
    return (
        <div className="page page1">
            <div className="p-header">My Rent</div>
            <div className="p-content">
                <div className="title">Payment Option</div>
                <div className="block-t1">
                    <div className="label">Whats's your accommodation status?</div>
                    <div className="btn-t1 btn-t1-selected">Looking to renew my rent</div>
                    <div className="btn-t1">Want to pay for a new place</div>
                    <div className="btn-t1">I'm still searching</div>
                </div>

                <div className="block-t1">
                    <div className="label">How much is your rent request amount?</div>
                    <input type="text" className="input-t1 rent-price" placeholder="Amount" 
                        onInput={(e) => {formatInput(e.target)}}/>
                </div>

                <div className="block-t1">
                    <div className="label">How much do you earn monthly?</div>
                    <input type="text" className="input-t1 wages" placeholder="Amount"
                        onInput={(e) => {formatInput(e.target)}}/>
                </div>

                <div className="block-t1">
                    <div className="label">Choose a monthly payment plan</div>
                    <select className="select-t1 pay-plan">
                        {plans.map((v,i) => 
                            <option value={i+1}>{i+1} Month{(i>0)?"s":""}</option>
                        )}
                    </select>
                </div>

                <div className="btn-next" onClick={btnAcceptClicked}>NEXT</div>
            </div>
        </div>
    )
}

function Page2({data}) {
    return (
        <div className="page page2">
            <div className="p-header">My Rent</div>
            <div className="p-content">
                <div className="title">Payment Option</div>

                <div className="block-t1">
                    <div className="label">How much is your rent request amount?</div>
                    <div className="input-holder">
                        <div class="f-label">Amount</div>
                        <input type="text" className="input-t1 amount" placeholder="Amount"
                            onInput={(e) => {
                                formatInput(e.target);
                                computeAndUpdatePayOption();
                            }}/>
                    </div>
                </div>
            
                <div className="block-t1">
                    <div className="label">Monthly Payment Plan</div>
                    <select className="select-t1 pay-plan2"  onChange={() => (computeAndUpdatePayOption())}>
                        {plans.map((v,i) => 
                            <option value={i+1}>{i+1} Month{(i>0)?"s":""}</option>
                        )}
                    </select>
                </div>

                <div className="block-t1">
                    <div className="label">Payment Option</div>
                    <div className="option-list">
                        {options.map((v,i) => 
                            <div className="li">
                                <span className="left">{v.name}</span><span className={"right i" + v.index}>{v.value}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="btn-next">ACCEPT</div>
            </div>
        </div>
    )
}

function formatMoney(amount){
    let str_val = String(amount);
    str_val = str_val.replace(/\,/g, "");
    let tmp_str = "";
    let f_amount = "";
    let counter = 1;
    for(let i = str_val.length-1; i >=0; i--){
        let ch = str_val.charAt(i);
        tmp_str += ch;
        if((counter%3 == 0) && (i > 0)) tmp_str += ",";
        counter++;
    }
    for(let i = tmp_str.length-1; i >=0; i--){
        f_amount += tmp_str.charAt(i);
    }
    return f_amount;
};

function formatInput(elm){
    let value = elm.value.trim();
    value = value.replace(/[^0-9]/g, "");
    if(!value){
        elm.value = "";
        return;
    }
    value = parseInt(value);
    value = formatMoney(value);
    elm.value = "₦" + value;
}

function updatePage2(price, wages, selectedMonthIndex, payable){
    let request = document.querySelector("#content-holder .page2 .amount");
    options[0].value = "₦" + formatMoney(price);
    options[1].value = "₦" + formatMoney(payable);
    options[2].value = String(selectedMonthIndex + 1) + " months";

    render(holder2, document.querySelector("#content-holder"));

    let page2MonthPlan = document.querySelector("#content-holder .page2 .pay-plan2");
    let page2RentRequest = document.querySelector("#content-holder .page2 .amount");

    page2RentRequest.value = "₦" + formatMoney(cashed_data.month_plan);
    page2MonthPlan.selectedIndex = (cashed_data.month_count - 1);
}

function updatePaymentOption(){

}

function btnAcceptClicked(){
    let price = parseInt(document.querySelector("#content-holder .page1 .rent-price").value.trim().replace(/[^0-9]/g, ""));
    let wages = document.querySelector("#content-holder .page1 .wages").value.trim().replace(/[^0-9]/g, "");
    let selectedMonthIndex = document.querySelector("#content-holder .page1 .pay-plan").selectedIndex;
    let monthCount = selectedMonthIndex + 1;

    let monthlyPay = computePayOption(price, monthCount)

    cashed_data.month_count = monthCount;
    cashed_data.month_plan = price;

    updatePage2(updatePage2(price, wages, selectedMonthIndex, monthlyPay));
}

function computeAndUpdatePayOption(){
    let price = parseInt(document.querySelector("#content-holder .page2 .amount").value.trim().replace(/[^0-9]/g, ""));
    let selectedMonthIndex = document.querySelector("#content-holder .page2 .pay-plan2").selectedIndex;

    let payable = 0;

    if(!price){
        price = 0;
    }else{
        payable = computePayOption(price, selectedMonthIndex+1);
    }
    
    (document.querySelector("#content-holder .page2 .block-t1 .option-list .i1")).innerHTML = "₦" + formatMoney(price);
    (document.querySelector("#content-holder .page2 .block-t1 .option-list .i2")).innerHTML = "₦" + formatMoney(payable);
    (document.querySelector("#content-holder .page2 .block-t1 .option-list .i3")).innerHTML = String(selectedMonthIndex + 1) + 
        " month" + ((selectedMonthIndex > 0)?"s":"");
}

function computePayOption(price, numOfMonths){
    let fractions = price / (numOfMonths)  //fraction payable per month
    let interest = ((2/100) * price) * (numOfMonths);  //interest per month
    let payable = (Math.round((fractions + interest) * 100) / 100).toFixed(0);
    return payable;
}

render(holder, document.getElementById("root"));
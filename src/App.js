import React from "react";
import { render } from "react-dom";


const holder = (
    <React.StrictMode>
        <div id="content-holder" callback={btnAcceptClicked}>
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
    {"name":"Pre-approved amount", "value":"₦200,000"}, {"name":"Monthly Payment", "value":"₦105,000"},
    {"name":"Tenor", "value":"2 months"}
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
                    <input type="text" className="input-t1 rent-price" placeholder="Amount"/>
                </div>

                <div className="block-t1">
                    <div className="label">How much do you earn monthly?</div>
                    <input type="text" className="input-t1 wages" placeholder="Amount"/>
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
                        <input type="text" className="input-t1 amount" placeholder="Amount"/>
                    </div>
                </div>
            
                <div className="block-t1">
                    <div className="label">Monthly Payment Plan</div>
                    <select className="select-t1 pay-plan2">
                        {plans.map((v,i) => 
                            <option value={i+1}>{i+1} Month{(i>0)?"s":""}</option>
                        )}
                    </select>
                </div>

                <div className="block-t1">
                    <div className="label">Payment Option</div>
                    <div className="option-list" onChange={(e) => {

                    }}>
                        {options.map((v,i) => 
                            <div className="li">
                                <span className="left">{v.name}</span><span className="right">{v.value}</span>
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

function updatePage2(price, wages, selectedMonthIndex, payable){
    let request = document.querySelector("#content-holder .page2 .amount");
    options[0].value = "₦" + formatMoney(price);
    options[1].value = "₦" + formatMoney(payable);
    options[2].value = String(selectedMonthIndex + 1) + " months";

    render(holder2, document.querySelector("#content-holder"));

    let page2MonthPlan = document.querySelector("#content-holder .page2 .pay-plan2");
    let page2RentRequest = document.querySelector("#content-holder .page2 .amount");

    page2RentRequest.value = formatMoney(cashed_data.month_plan);
    page2MonthPlan.selectedIndex = (cashed_data.month_count - 1);
}

function recalculatePrice(){
    
}

export function btnAcceptClicked(){
    let price = parseInt(document.querySelector("#content-holder .page1 .rent-price").value.trim());
    let wages = document.querySelector("#content-holder .page1 .wages").value.trim();
    let selectedMonthIndex = document.querySelector("#content-holder .page1 .pay-plan").selectedIndex;

    let fractions = price / (selectedMonthIndex+1)  //fraction payable per month
    let interest = ((2/100) * price) * (selectedMonthIndex+1);  //interest per month
    let payable = fractions + interest;

    cashed_data.month_count = selectedMonthIndex+1;
    cashed_data.month_plan = price;

    updatePage2(updatePage2(price, wages, selectedMonthIndex, payable));
}

render(holder, document.getElementById("root"));
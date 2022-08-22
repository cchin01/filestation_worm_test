const radios = document.querySelectorAll('input[name="extend_method"]');
const period = document.querySelector('input[name="extend_period"]');
const periodUnit = document.querySelector('select[name="extend_period_unit"]');
const example = document.querySelector('#example');
const change = document.querySelector(`.change`);
const resetTotal = document.querySelector(`#reset_total`);

/* 看 example 有沒有被 hidden 來判斷目前狀態 */
const statuscheck = document.querySelector(".window_ExtendRetension_content_example");
const total_img = document.querySelector(".SetTotalRentenssion_img");
const add_img = document.querySelector(".AddExtraTime_img");
const forever_img = document.querySelector(".LockForever_img");

let method = "total"
let origin_period = 3;
let extend_period = 5;
let extend_period_unit = "year";

/*  
outcome unit: days
1 year = 360 days ( 一年等於 360 天，等於 12 個月又 5 天，不對等比較 )

1 year = 360 days
1 month = 30 days
*/
let outcome_days= 0;
let outcome_period ="";

let caculate = function() {
    if (method == "total"){
        if (extend_period_unit == "year") {
            if (extend_period < origin_period){
                outcome_days = origin_period*360;
                console.log(`1`);
            }else {
                outcome_days = extend_period*360;
                console.log(`2`);
            }
        }else if (extend_period_unit == "month") {
            if (extend_period*30 < origin_period*360){
                outcome_days = origin_period*360;
                console.log(`3`);
            }else {
                outcome_days = extend_period*30;
                console.log(`4`);
            }
        }else {
            if (extend_period < origin_period*360){
                outcome_days = origin_period*360;
                console.log(`5`);
            }else {
                outcome_days = extend_period;
                console.log(`6`);
            }
        }
    }else if (method == "add"){
        if (extend_period_unit == "year") {
            outcome_days = origin_period*360 + extend_period*360;
        }else if (extend_period_unit == "month") {
            outcome_days = origin_period*360 + extend_period*30;
        }else {
            outcome_days = origin_period*360 + extend_period;
        }
    }else {
            outcome_days = `forever`;
    }
    getFormatedStringFromDays(outcome_days);
}

let getFormatedStringFromDays = function(i) {
    let years = Math.floor(i / 360);
    let months = Math.floor(i % 360 / 30);
    let days = Math.floor(i % 360 % 30);

    outcome_period = years + ' year(s) ' + months + ` month(s) ` + days + ` day(s)`; 
}

let message = function() {
    if (outcome_days == `forever`){
        example.innerHTML = `Your file(s) will be locked froever.`;
    } else {
        example.innerHTML = `If the file's original retension is ` + origin_period + ` years. The new retension will be ` +  outcome_period + `.`;
    }
}

for (const radio of radios) {
    radio.onclick = (e) => {
        method = e.target.value;
        if ( statuscheck.classList.contains("hidden")){
            if(e.target.value=="total"){
                add_img.classList.add("hidden");
                total_img.classList.add("hidden");
                forever_img.classList.add("hidden");
                total_img.classList.remove("hidden");
                console.log("dddd");
                console.log(e.target.value);
            }else if (e.target.value=="add"){
                add_img.classList.add("hidden");
                total_img.classList.add("hidden");
                forever_img.classList.add("hidden");
                add_img.classList.remove("hidden");
                console.log("eee");
                console.log(e.target.value);
            }else {
                add_img.classList.add("hidden");
                total_img.classList.add("hidden");
                forever_img.classList.add("hidden");
                forever_img.classList.remove("hidden");
                console.log("ffff");
                console.log(e.target.value);
            }
        } else {
            console.log(e.target.value);
            caculate();
            message();
        }
    }
  }

period.oninput = (e) => {
    extend_period = document.querySelector('input[name="extend_period"]').value;
    caculate();
    message();
};
  

periodUnit.addEventListener("change", function() {
    extend_period_unit = document.querySelector('select[name="extend_period_unit"]').value;
    caculate();
    message();
    console.log(extend_period_unit);
});

change.addEventListener("click", (e) => {
    if (statuscheck.classList.contains("hidden")) {
        statuscheck.classList.remove("hidden");
        add_img.classList.add("hidden");
        total_img.classList.add("hidden");
        forever_img.classList.add("hidden");
    }else {
        statuscheck.classList.add("hidden");
        resetTotal.checked = true;
        total_img.classList.remove("hidden");
    }
});
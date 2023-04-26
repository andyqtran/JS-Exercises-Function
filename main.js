function domId(id) {
    return document.getElementById(id);
}

var currencyFormat = new Intl.NumberFormat();

/* 
Bài 1
Input: Điểm chuẩn, điểm 3 môn thi, khu vực, đối tượng
Processing:
Viết function locationScore(location) trả về điểm theo khu vực
Viết function objectScore(object) trả về điểm theo đối tượng
Viết function sumScore(threeScore, locationScore, objectScore) trả về điểm tổng
Kiểm tra và xuất
Output: Kết quả
*/
function locationScore(location) {
    var score = 0;
    switch (location) {
        case "A":
            score = 2;
            break;
        case "B":
            score = 1;
            break;
        case "C":
            score = 0.5;
            break;
        default:
            break;
    }
    return score;
}

function objectScore(object) {
    var score = 0;
    switch (object) {
        case 1:
            score = 2.5;
            break;
        case 2:
            score = 1.5;
            break;
        case 3:
            score = 1;
            break;
        default:
            break;
    }
    return score;
}

function sumScore(threeScore, locationScore, objectScore) {
    return threeScore + locationScore + objectScore;
}

domId("btnSumScore").onclick = function () {
    var standardScore = domId("standardScore").value * 1;
    var threeScore = domId("threeScore").value * 1;
    if (threeScore < 0 || standardScore < 0) {
        alert("Vui lòng nhập điểm hợp lệ");
        return;
    }
    var location = domId("location").value;
    var object = domId("object").value * 1;

    var locationScoreValue = locationScore(location);
    var objectScoreValue = objectScore(object);
    var sumScoreValue = sumScore(
        threeScore,
        locationScoreValue,
        objectScoreValue
    );
    var result = "";
    if (sumScoreValue >= standardScore) {
        result = `Đậu | Tổng điểm là: ${sumScoreValue}`;
    } else {
        result = `Rớt | Tổng điểm là: ${sumScoreValue}`;
    }

    domId("result").innerHTML = result;
};

/*
Bài 2
Input: tên, số Kw
processing:
tạo function pay50kw
tạo function pay100kw
tạo function pay200kw
tạo function pay350kw
tạo function payRemain
tính tiền
Output: tên + tiền
 */

const PRICE_50KW_FIRST = 500;
const PRICE_50KW_NEXT = 650;
const PRICE_100KW_NEXT = 850;
const PRICE_150KW_NEXT = 1100;
const PRICE_REMAIN = 1300;

function pay50kw(kw) {
    return PRICE_50KW_FIRST * kw;
}

function pay100kw(kw) {
    return pay50kw(50) + (kw - 50) * PRICE_50KW_NEXT;
}

function pay200kw(kw) {
    return pay100kw(100) + (kw - 100) * PRICE_100KW_NEXT;
}

function pay350kw(kw) {
    return pay200kw(200) + (kw - 200) * PRICE_150KW_NEXT;
}

function payRemain(kw) {
    return pay350kw(350) + (kw - 350) * PRICE_REMAIN;
}

function payment(kw) {
    if (kw < 0) {
        alert("Vui lòng nhập số Kw hợp lệ");
        return -1;
    }
    if (kw <= 50) {
        return pay50kw(kw);
    } else if (kw <= 100) {
        return pay100kw(kw);
    } else if (kw <= 200) {
        return pay200kw(kw);
    } else if (kw <= 350) {
        return pay350kw(kw);
    } else {
        return payRemain(kw);
    }
}

domId("paymentBtnB2").onclick = function () {
    var name = domId("name2").value;
    var kw = domId("kw").value * 1;
    var paymentValue = currencyFormat.format(payment(kw));
    if (payment(kw) >= 0) {
        domId(
            "paymentB2"
        ).innerHTML = `Tên: ${name} | Thành tiền: ${paymentValue} VND`;
    }
};

/*
Input: Họ tên, Tổng thu nhập năm, số người phụ thuộc
Processing: 
tạo function thu nhập chịu thuế: incomeAfter
tạo function tính thuế: tax60, tax60To120, tax120To210, tax210To384, tax384To624, tax624To960, taxOver960
*/

const TAX_60 = 5;
const TAX_60_TO_120 = 10;
const TAX_120_TO_210 = 15;
const TAX_210_TO_384 = 20;
const TAX_384_TO_624 = 25;
const TAX_624_TO_960 = 30;
const TAX_OVER_960 = 35;

function incomeAfter(income, people) {
    return income - 4e6 - people * 1.6e6;
}

function tax60(incomeAfter) {
    return (TAX_60 / 100) * incomeAfter;
}
function tax60To120(incomeAfter) {
    return tax60(60) + ((incomeAfter - 60) * TAX_60_TO_120) / 100;
}
function tax120To210(incomeAfter) {
    return tax60To120(120) + ((incomeAfter - 120) * TAX_120_TO_210) / 100;
}
function tax210To384(incomeAfter) {
    return tax120To210(210) + ((incomeAfter - 210) * TAX_210_TO_384) / 100;
}
function tax384To624(incomeAfter) {
    return tax60To120(384) + ((incomeAfter - 384) * TAX_384_TO_624) / 100;
}
function tax624To960(incomeAfter) {
    return tax384To624(624) + ((incomeAfter - 624) * TAX_624_TO_960) / 100;
}
function taxOver960(incomeAfter) {
    return tax624To960(960) + ((incomeAfter - 960) * TAX_OVER_960) / 100;
}

domId("paymentBtnB3").onclick = function () {
    var name3 = domId("name3").value;
    var income = domId("income").value * 1;
    var people = domId("people").value * 1;
    var incomeAfterValue = incomeAfter(income, people);
    var tax = 0;
    if (incomeAfterValue < 0) {
        alert("Vui lòng nhập thu nhập hợp lệ");
        return;
    } else if (incomeAfterValue <= 60e6) {
        tax = tax60(incomeAfterValue);
    } else if (incomeAfterValue <= 120e6) {
        tax = tax60To120(incomeAfterValue);
    } else if (incomeAfterValue <= 210e6) {
        tax = tax120To210(incomeAfterValue);
    } else if (incomeAfterValue <= 384e6) {
        tax = tax210To384(incomeAfterValue);
    } else if (incomeAfterValue <= 624e6) {
        tax = tax384To624(incomeAfterValue);
    } else if (incomeAfterValue <= 960e6) {
        tax = tax624To960(incomeAfterValue);
    } else {
        tax = taxOver960(incomeAfterValue);
    }

    tax = currencyFormat.format(Math.round(tax));

    domId(
        "paymentB3"
    ).innerHTML = `Tên: ${name3} | Tiền thuế thu nhập cá nhân: ${tax} VND`;
};

/*
Bài 4:
Input: Loại khách hàng, Mã khách hàng, số kết nối, số kênh cao cấp
Processing:
tạo function residentialPayment, servicePayment, commercialPayment, payment
Output: payment
*/

const RESIDENTIAL_BILL_FEE = 4.5;
const RESIDENTIAL_SERVICE_FEE = 20.5;
const RESIDENTIAL_PREMIUM_FEE = 7.5;

const COMMERCIAL_BILL_FEE = 15;
const COMMERCIAL_SERVICE_FEE_FIRST = 75;
const COMMERCIAL_SERVICE_FEE_NEXT = 5;
const COMMERCIAL_PREMIUM_FEE = 50;

function connectionOnOff() {
    if (domId("customerType").value == "commercial") {
        domId("connection").style.display = "block";
    } else {
        domId("connection").style.display = "none";
    }
}

function residentialPayment(premiumChannel) {
    return (
        RESIDENTIAL_BILL_FEE +
        RESIDENTIAL_SERVICE_FEE +
        RESIDENTIAL_PREMIUM_FEE * premiumChannel
    );
}

function servicePayment(connection) {
    if (connection < 0) {
        return;
    } else if (connection <= 10) {
        return COMMERCIAL_SERVICE_FEE_FIRST;
    } else {
        return (
            COMMERCIAL_SERVICE_FEE_FIRST +
            (connection - 10) * COMMERCIAL_SERVICE_FEE_NEXT
        );
    }
}

function commercialPayment(connection, premiumChannel) {
    return (
        COMMERCIAL_BILL_FEE +
        servicePayment(connection) +
        premiumChannel * COMMERCIAL_PREMIUM_FEE
    );
}

domId("paymentBtnB4").onclick = function () {
    var customerType = domId("customerType").value;
    var customerId = domId("customerId").value;
    var premiumChannel = domId("premiumChannel").value * 1;
    var connection = domId("connection").value * 1;
    var payment = 0;
    if (connection < 0 || premiumChannel < 0) {
        alert("Vui lòng nhập hợp lệ");
        return;
    }
    switch (customerType) {
        case "residential":
            payment = residentialPayment(premiumChannel);
            break;
        default:
            payment = commercialPayment(connection, premiumChannel);
            break;
    }

    payment = currencyFormat.format(payment);
    domId(
        "paymentB4"
    ).innerHTML = `Mã khách hàng: ${customerId} | Tiền cáp: $${payment}`;
};

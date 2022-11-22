export default {
    method: {
        $currencyFormat(value, format = "#,###") {
            // 가격,등 세자리마다 ,을 찍어주는 메소드
            if (value == 0 || value == null) return 0;

            var currency = format.substring(0, 1);
            if (currency === "$" || currency === "₩") {
                format = format.substring(1, format.length);
            } else {
                currency = "";
            }
        },
    },
};

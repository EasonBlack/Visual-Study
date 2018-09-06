const drawOutline = ({c, chartMargin, chartWH}) => {
    let scaleY = -5;
    let scaleWidth = chartWH.w / 10;
    c.beginPath();

    c.moveTo(chartMargin.x, chartMargin.y);
    c.lineTo(chartMargin.x, 200);
    c.stroke();
    for(let i = 0;i<=10;i++) {
        c.moveTo(chartMargin.x + scaleWidth * i, chartMargin.y );
        c.lineTo(chartMargin.x + scaleWidth * i, chartMargin.y+scaleY );
        c.stroke();
        let txt = (i * 10).toString();
        c.fillText(txt, chartMargin.x + scaleWidth * i - txt.length * 2.5, chartMargin.y+scaleY -5);   

    }   
}
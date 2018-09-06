
const drawItem = ({c, item, x, y, chartMargin, chartWH}) => {
    c.beginPath();
    c.font =  "normal lighter 16px Sans-Serif";
    c.fillStyle='black';
    c.strokeStyle = '#ccc';
    c.fillText(item.name, x, y);   
    
    let marginX = chartMargin.x + x;
    let marginY = chartMargin.y + y;
    let itemY = marginY - 5;
    // c.moveTo(marginX , itemY );
    // c.lineTo(marginX + chartWH.w, itemY);
    // c.stroke();

    // c.beginPath();
    // let total = 100;
    // c.fillStyle='red';
    // c.arc(marginX + chartWH.w*item.start/100 , itemY, 3, 0, 2 * Math.PI);
    // c.fill();
    // c.beginPath();
    // c.fillStyle='darkblue';
    // c.arc(marginX + chartWH.w*item.end/100 , itemY, 3, 0, 2 * Math.PI);
    // c.fill();

    // c.beginPath();
    // c.strokeStyle = 'black';
    // c.moveTo(marginX + chartWH.w*item.start/100 + 1.5 , itemY);
    // c.lineTo(marginX + chartWH.w*item.end/100 -  1.5 , itemY);
    // c.stroke();


    //----------------------
    c.save();
    c.beginPath();
    c.translate(marginX, marginY);
    c.moveTo(0 , -5 );
    c.lineTo(chartWH.w, -5);
    c.stroke();
    c.beginPath();
    let total = 100;
    c.fillStyle='red';
    c.arc(chartWH.w*item.start/100 , -5, 3, 0, 2 * Math.PI);
    c.fill();
    c.beginPath();
    c.fillStyle='darkblue';
    c.arc(chartWH.w*item.end/100 , -5, 3, 0, 2 * Math.PI);
    c.fill();

    c.beginPath();
    c.strokeStyle = 'black';
    c.moveTo(chartWH.w*item.start/100 + 1.5 , -5);
    c.lineTo(chartWH.w*item.end/100 -  1.5 , -5);
    c.stroke();
    c.closePath();
    c.restore();


    //----------------------
    c.beginPath();
    c.rect( marginX + chartWH.w + 5, itemY-7, 30, 15);
    c.fill();
    
}
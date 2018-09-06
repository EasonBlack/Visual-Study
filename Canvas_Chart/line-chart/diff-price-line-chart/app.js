const drawChart = ({c, items, canvasMargin, chartMargin, chartWH}) => {
    c.save();
    c.translate(canvasMargin.x, canvasMargin.y);
    drawOutline({c, chartMargin, chartWH});
    items.forEach((item, index)=>{
        drawItem({ c, item, x:0, y: index * 20 + 5, chartMargin, chartWH });
    })
    c.restore();
}
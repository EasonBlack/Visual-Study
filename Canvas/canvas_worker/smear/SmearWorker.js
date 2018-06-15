function smear(pixels){
    var data = pixels.data,
        width = pixels.width,
        height = pixels.height;
    
    var n = 10,
        m = n-1,
        i,
        col;
    console.log(data.length)
    for(var row=0; row<height; row++){
        i = row*width*4 + 4;
        for(col =1;col<width; col++,i+=4){
            data[i] = (data[i] +data[i-4]*m/n);
            data[i+1] = (data[i+1] +data[i-3]*m/n);
            data[i+2] = (data[i+2] +data[i-2]*m/n);
            data[i+3] = (data[i+3] +data[i-1]*m/n);
            
        } 
    }
    return pixels;
}

onmessage = function(e){
    postMessage(smear(e.data));
};
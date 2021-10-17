
var rectangleProp = require('./rectangleProp')

var solveRectangle = function (height, weight){
    
    rectangleProp(height, weight, (err, rectangle) => {

        if(err) { 
            console.log(`ERROR: ${err.message}`);
        }
        else {
            console.log(`Area: ${rectangle.area()}`);
            console.log(`Perimeter: ${rectangle.perimeter()}`);
        }
    });
    console.log(`End of function`);
}

solveRectangle(2, 4);
solveRectangle(0, 4);
solveRectangle(9, 4);

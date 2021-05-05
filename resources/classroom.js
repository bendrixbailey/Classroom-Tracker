//JS for classroom covid counter. Room numbers are passed only as integers,
//functions will convert to change necessary information
//following class is for a room, stores values for the given room.
var room1 = {normal: 40, yellow: 10, max: 20, current: 0};
var room2 = {normal: 30, yellow: 12, max: 28, current: 0};
var room3 = {normal: 25, yellow: 8, max: 12, current: 0};
var room4 = {normal: 50, yellow: 18, max: 22, current: 0};


//This function updates the color of any element to any color
function updateRoom(room_num, color, text){
    //function changes color of the given room to the given color
    //TODO change subtitle text and count of the room to reflect
    switch(room_num){
        case 1: 
            document.getElementById("b1").style.background = color;
            document.getElementById("c1").innerHTML = room1.current;
            document.getElementById("class-desc1").innerHTML = text;
            break;
        case 2: 
            document.getElementById("b2").style.background = color;
            document.getElementById("c2").innerHTML = room2.current;
            document.getElementById("class-desc2").innerHTML = text;
            break;
        case 3: 
            document.getElementById("b3").style.background = color;
            document.getElementById("c3").innerHTML = room3.current;
            document.getElementById("class-desc3").innerHTML = text;
            break;
        case 4: 
            document.getElementById("b4").style.background = color; 
            document.getElementById("c4").innerHTML = room4.current;
            document.getElementById("class-desc4").innerHTML = text;
            break;
    }
}

function addStudent(){
    //add student to given room
    var schema;
    if(document.getElementById("r1").checked){
        room1.current += 1;
        schema = getNewSchema(room1.current, room1);
        updateRoom(1, 
                    schema[0], //color
                    schema[1] //message
                    );
    }
    if(document.getElementById("r2").checked){
        room2.current += 1;
        schema = getNewSchema(room2.current, room2);
        updateRoom(2, 
                    schema[0],
                    schema[1]
                    );
    }
    if(document.getElementById("r3").checked){
        room3.current += 1;
        schema = getNewSchema(room3.current, room3);
        updateRoom(3, 
                    schema[0],
                    schema[1]
                    );  
    }
    if(document.getElementById("r4").checked){
        room4.current += 1;
        schema = getNewSchema(room4.current, room4);
        updateRoom(4, 
                    schema[0],
                    schema[1]
                    );
    }
}

function removeStudent(){
    //add student to given room
    var schema;
    if(document.getElementById("r1").checked){
        if(room1.current > 0 )room1.current -= 1;
        schema = getNewSchema(room1.current, room1);
        updateRoom(1, 
                    schema[0], //color
                    schema[1] //message
                    );
    }else if(document.getElementById("r2").checked){
        if(room2.current > 0 )room2.current -= 1;
        schema = getNewSchema(room2.current, room2);
        updateRoom(2, 
                    schema[0],
                    schema[1]
                    );
    }else if(document.getElementById("r3").checked){
        if(room3.current > 0 )room3.current -= 1;
        schema = getNewSchema(room3.current, room3);
        updateRoom(3, 
                    schema[0],
                    schema[1]
                    );  
    }else if(document.getElementById("r4").checked){
        if(room4.current > 0 )room4.current -= 1;
        schema = getNewSchema(room4.current, room4);
        updateRoom(4, 
                    schema[0],
                    schema[1]
                    );
    }
}

function getNewSchema(count, room){
    //function takes count of given room and returns the
    //color and text that the room background should be in array format.
    if(count <= 0){
        return ["#d3d3d3", ""];
    }
    if(count < room.yellow){
        return ["#7FB375", "Welcome!"]; //return green color and text
    }
    if(count >= room.yellow && count < room.max){
        return ["#B0A856", "Careful..."]; //return yellow color and text
    }
    if(count >= room.max){
        return ["#C26860", "Run!"]; //return red color and text
    }
}


import {FRUITS} from "/suika1/fruits.js"



var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Body = Matter.Body,
    Events = Matter.Events;

const engine = Engine.create();

const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes : false,
        background: '#F7F4C8',
        width: 620,
        height: 850,
    }
});
const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790,{
    isStatic : true,
    render : {fillStyle: '#FE642E'}
})
const right = Bodies.rectangle(605, 395, 30, 790,{
    isStatic : true,
    render : {fillStyle: '#E6B143'}
})
const ground = Bodies.rectangle(310, 820, 620, 60,{
    isStatic : true,
    render : {fillStyle: '#424242'}
})
const topLine = Bodies.rectangle(310, 150, 620, 2,{
    isStatic : true,
    isSensor : true,
    render : {fillStyle: '#FAAC58'}
})


World.add(world, [leftWall,right,ground,topLine]);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;

let disableAction = false;

function addFruit(){

    const index = Math.floor(Math.random() * 5);

    const fruit = FRUITS[index];

    const body = Bodies.circle(300, 50, fruit.radius,{
        index : index,
        isSleeping : true,
        render : {
            sprite : { texture : `${fruit.name}.png`}
        },
        restitution : 0.1,
    });
    currentBody = body;
    currentFruit = fruit;

    World.add(world, body);
}

window.onkeydown = (event) =>{
    if(disableAction)
        return;

    const fruitSize = FRUITS[currentBody.index].radius;
    switch(event.code){
        case "KeyA":
            if(currentBody.position.x - 10 <= 25 +fruitSize){
                break;
            }
            Body.setPosition(currentBody, {
                x: currentBody.position.x - 10,
                y: currentBody.position.y
            })
            break;
        case "KeyD":
            if(currentBody.position.x +10 >= 593 -fruitSize){
                break;
            }
            Body.setPosition(currentBody, {
                x: currentBody.position.x + 10,
                y: currentBody.position.y
            })
            break;
        case "KeyS":
            currentBody.isSleeping = false;
            disableAction = true;
            setTimeout(()=>{
                disableAction = false;
                addFruit();                
            },1000)
            break;
    }
}

Events.on(engine,"collisionStart", (event)=>{
    event.pairs.forEach((collision)=>{
        if (collision.bodyA.id == topLine.id || collision.bodyB.id == topLine.id) {
			setTimeout(() => {
				if (Matter.Collision.collides(collision.bodyA, collision.bodyB) !== null) {
					alert("아웃");
				}
			}, 5000);
		}

        if(collision.bodyA.index == collision.bodyB.index){

            const index = collision.bodyA.index;

            World.remove(world, [collision.bodyA, collision.bodyB]);

            const newFruit = FRUITS[index + 1];
            const newBody = Bodies.circle(
                collision.collision.supports[0].x,
                collision.collision.supports[0].y,
                newFruit.radius,
                {
                    index : index+1,
                    render : {sprite : {texture : `${newFruit.name}.png`}}
                }
            )
            World.add(world, newBody)
        }
    });
});




addFruit();
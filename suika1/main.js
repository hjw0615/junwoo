import { FRUITS} from "/suika1/fruit.js"



var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World,
    Body = Matter.Boddy;

const engine = Engine.create();

const render = Render.create({
    engine,
    element: document.body,
    options: {
        wireframes : false,
        background: '#F7F4C8',
        width: 620,
        higth: 850,
    }
});
const world = engine.world;

const leftWall = Bodies.rectangle(15, 395, 30, 790,{
    isStatic : true,
    render : {filStyle: '#E6B143'}
})
const right = Bodies.rectangle(605, 395, 30, 790,{
    isStatic : true,
    render : {filStyle: '#E6B143'}
})
const ground = Bodies.rectangle(310, 820, 620, 60,{
    isStatic : true,
    render : {filStyle: '#E6B143'}
})
const topLine = Bodies.rectangle(310, 150, 620, 2,{
    isStatic : true,
    isSenser : true,
    render : {filStyle: '#E6B143'}
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
window.onkeydown((event) =>{
    switch(event.code){
        case "KeyA":
            Body.setPosition(currentBody, {
                x: cuttentBody.position.x - 10,
                y: currentBody.position.y
            })
            break;
        case "KeyD":
            Body.setPosition(currentBody, {
                x: cuttentBody.position.x + 10,
                y: currentBody.position.y
            })
            break;
        case"KeyS":
            currentBody.issSleeping = false;
            addFruit();
            setTimeout(()=>{
                addFruit();
                disableAction = false;
            },1000)
            break;
    }

});

addFruit();
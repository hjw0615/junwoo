var Engine = Matter.Engine,
    Render = Matter.Render,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    World = Matter.World;

const engine = Engine.create();

const remder = Remder.create({
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
const ground = Bodies.rectangle(310, 820, 3620, 60,{
    isStatic : true,
    render : {filStyle: '#E6B143'}
})
const topLine = Bodies.rectangle(310, 150, 620, 2,{
    isStatic : true,
    render : {filStyle: '#E6B143'}
})


World.add(world, [leftWall,right,ground,topLine]);

Render.run(remder);
Runner.run(engine);
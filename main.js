const CON = new CONST();
const KEYINFO = new KEY();

let sky, hill;
let dandalion;
let info;

let wheather, rain, snow, cloud;
let totoro;
let custom_date;
let serial;

const datGuiParams = {
    displayMode: true,
    debugMode: false,
    windMode: false,
    rainMode: false,
    snowMode: false,
    n: 4.5,
    d: 12.3,
    t: 20,
    s: 40,
    c: 0,
    angle: 0,
    step: 2,
    p: 20,
    test: 12
};

// TODO : track user ip and find country
let cur_city = CON.ARRAY.city[0];

function setup() {
    createCanvas(CON.DIMEN.width, CON.DIMEN.height);

    var gui = new dat.GUI();
    gui.add(datGuiParams, "displayMode");
    gui.add(datGuiParams, "debugMode");
    gui.add(datGuiParams, "windMode");
    gui.add(datGuiParams, "snowMode");
    gui.add(datGuiParams, "rainMode");
    gui.add(datGuiParams, "s").min(20).max(350).step(1);
    gui.add(datGuiParams, "angle").min(-5).max(5).step(0.01);
    gui.add(datGuiParams, "t").min(40).max(400).step(1);
    gui.add(datGuiParams, "test").min(1).max(15).step(0.1);

    sky = new Sky();
    hill = new Hill();
    totoro = new Totoro();
    dandalion = new Dandalion();
    wheather = new Weather();
    rain = new Rain();
    snow = new Snow();
    cloud = new Cloud();
    info = new Info();
    custom_date = new CustomDate();
    // serial = new Serial();

    sky.init(0.6);
    hill.init(0, 0);
    totoro.init(CON.DIMEN.totoro_x, CON.DIMEN.totoro_y, CON.DIMEN.totoro_scale);
    wheather.init();
    rain.init();
    snow.init();
    dandalion.init(CON.DIMEN.width, CON.DIMEN.height);
    info.init();
    custom_date.init();
    // serial.init();

    sky.calculateByTimeToSky(CON.VALUE.city_offset[cur_city]);
    dandalion.getBranchColor(CON.VALUE.city_offset[cur_city]);
    wheather.loadWeatherData(cur_city, 0, setWheaterData);
    // info.setPosition(
    //     { 'x': 20, 'y': CON.DIMEN.height - 60 },
    //     { 'x': CON.DIMEN.width - 140, 'y': 0 }
    // );
    button = createButton('date-effect');
    button.position(0, 0);
    button.mousePressed(()=> {
        info.startDateAnim();
    });

    button = createButton('city-effect');
    button.position(0, 100);
    button.mousePressed(()=> {
        info.startCityAnim();
    });

    info.setCityText(cur_city);
    info.setDateText(custom_date.getDate());

    // serial.setMainSerialEventCallback(serialData);


    intervalSetup();

    /* Adjust brightness of objects */
    // setInterval(sky.calculateByTimeToSky(CON.VALUE.city_offset[cur_city]), CON.TIME.sec * 10);
    // setInterval(dandalion.getBranchColor(CON.VALUE.city_offset[cur_city]), CON.TIME.sec * 10);
    // setInterval(() => {
    //   sky.calculateByTimeToSky(CON.VALUE.city_offset[cur_city]);
    // }, CON.TIME.min);
    // setInterval(() => {
    //   dandalion.getBranchColor(CON.VALUE.city_offset[cur_city]);
    // }, CON.TIME.min);

}
function intervalSetup() {
    // update date
    setInterval(() => {
        info.setDateText(custom_date.getDate());
    }, CON.TIME.sec);
}

function draw() {
    sky.draw();
    // cloud.draw();
    hill.draw();
    dandalion.draw();
    totoro.draw();
    info.draw();

    if( datGuiParams.snowMode ) { snow.draw(); }
    if( datGuiParams.rainMode ) { rain.draw(); }
}

function setWheaterData(data) {
    print(data);

    cloud.init(data[0].clouds.all, data[0].wind.speed);
}

function serialData(data) {
    print('main serial data callback receive : ', data);
    // TODO: set coutnry, blow value
    // changeCountry(city)
    // blowDandalion(wind)
}

function blowDandalion(wind) {

}

function changeCountry(city) {
    // wheather.loadWeatherData(city, 0, setWheaterData);
    cur_city = CON.ARRAY.city[city];
    info.setCityText(cur_city);
}

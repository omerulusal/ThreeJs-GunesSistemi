const gunesTexture = new THREE.TextureLoader().load('./img/gunes.jpg');
const merkurTexture = new THREE.TextureLoader().load('./img/merkur.jpg');
const venusTexture = new THREE.TextureLoader().load('./img/venus.jpg');
const dunyaTexture = new THREE.TextureLoader().load('./img/dunya.jpg');
const marsTexture = new THREE.TextureLoader().load('./img/mars.jpg');
const jupiterTexture = new THREE.TextureLoader().load('./img/jupiter.jpg');
const saturnTexture = new THREE.TextureLoader().load('./img/saturn.jpg');
const saturn_ringTexture = new THREE.TextureLoader().load('./img/saturn_halka.png');
const uranusTexture = new THREE.TextureLoader().load('./img/uranus.jpg');
const uranus_ringTexture = new THREE.TextureLoader().load('./img/uranus_halka.png');
const neptunTexture = new THREE.TextureLoader().load('./img/neptun.jpg');
const plutonTexture = new THREE.TextureLoader().load('./img/pluton.jpg');
//GEZEGEN GÖRSELLERİNİ EKLEDİM.
const scene = new THREE.Scene();//Sahneyi Oluşturdum
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-90, 140, 140);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//*****-----*****-------IŞIKLAR-----*****-----****----****---
const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);
const spotLight = new THREE.SpotLight(0xff00dd);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);//3 parametre sırasıyla X Y ve Z'dir.
const pLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pLight);
// pLight ile gezegenlere gece ve gündüz havası verdim.

//*****-----*****-------YÖN KONTROL-----*****-----****----****---
const orbit = new THREE.OrbitControls(camera, renderer.domElement);
orbit.target.set(0, 0, 0);
orbit.update();


//*****-----*****-------GEZEGENLER-----*****-----****----***---
const textureLoader = new THREE.TextureLoader();
//EBEVYN ELEMENTİM OLAN GÜNEŞİ OLUŞTURDUM
const gunesGeo = new THREE.SphereGeometry(16, 30, 30);
const gunesMat = new THREE.MeshBasicMaterial({
    map: gunesTexture
});
const gunes = new THREE.Mesh(gunesGeo, gunesMat);
scene.add(gunes);

function gezegenler(size, texture, position, ring) {
    //Gezegenlerin 4 paramatre alacağını belirttim.
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: texture
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);

    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: ring.texture,
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        //halkanın x eksenindeki konumunu position parametresine atadım
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return { mesh, obj }
}


const merkur = gezegenler(3.2, merkurTexture, 28);//size, texture ve position parametrelerine tekabül eder.
const venus = gezegenler(5.8, venusTexture, 44);
const dunya = gezegenler(6, dunyaTexture, 62);
const mars = gezegenler(4, marsTexture, 78);
const jupiter = gezegenler(12, jupiterTexture, 100);
const saturn = gezegenler(10, saturnTexture, 138, {
    //bu değerler size, texture, position ve ring parametrelerine tekabül eder.
    innerRadius: 10,
    outerRadius: 20,
    texture: saturn_ringTexture
    //saturn halkalarının yapısını oluşturdum.
});
const uranus = gezegenler(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranus_ringTexture
});
const neptun = gezegenler(7, neptunTexture, 200);
const pluton = gezegenler(2.8, plutonTexture, 216);



//*****-----*****-------ANİMASYON-----*****-----****----****---
function animate() {
    merkur.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    dunya.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptun.mesh.rotateY(0.032);
    pluton.mesh.rotateY(0.008);


    merkur.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    dunya.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptun.obj.rotateY(0.0001);
    pluton.obj.rotateY(0.00007);

    renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate);
window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
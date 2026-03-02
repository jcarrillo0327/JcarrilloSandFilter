let scene, camera, renderer, particles = [];
let physics = new PhysicsEngine();
let running = false;

function init3D() {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth/420, 0.1, 1000);
    camera.position.z = 2.5;

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, 420);
    document.getElementById('container3d').appendChild(renderer.domElement);

    animate();
}

function animate() {
    requestAnimationFrame(animate);

    if (running) {
        let data = physics.step();
        updateCharts(data);
    }

    update3DParticles();
    renderer.render(scene, camera);
}

function update3DParticles() {
    // Add/remove meshes to match physics particles
    while (particles.length < physics.particles.length) {
        let geom = new THREE.SphereGeometry(0.015, 8, 8);
        let mat = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
        particles.push(new THREE.Mesh(geom, mat));
        scene.add(particles[particles.length - 1]);
    }

    while (particles.length > physics.particles.length) {
        scene.remove(particles.pop());
    }

    physics.particles.forEach((p, i) => {
        particles[i].position.set(p.x, p.y, p.z);
    });
}

document.getElementById("startBtn").onclick = () => running = true;
document.getElementById("stopBtn").onclick = () => running = false;
document.getElementById("resetBtn").onclick = () => location.reload();

init3D();

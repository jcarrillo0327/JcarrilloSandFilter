class PhysicsEngine {
    constructor() {
        this.particles = [];
        this.flowRateBPD = 1500;
        this.sandMesh = 100;
        this.cakeThickness = 0;
        this.pressureDrop = 0;
        this.time = 0;
    }

    spawnParticle() {
        this.particles.push({
            x: Math.random() * 0.1 - 0.05,
            y: Math.random() * 0.1 - 0.05,
            z: -4.5,
            vx: 0,
            vy: 0,
            vz: 0.2
        });
    }

    updateParticle(p) {
        // Swirl field → concave inlet vortex
        let swirl = 0.8;
        let r = Math.sqrt(p.x*p.x + p.y*p.y);

        p.vx += -p.y * swirl * 0.05;
        p.vy +=  p.x * swirl * 0.05;

        // Venturi acceleration zone
        if (p.z > -4 && p.z < -3) {
            p.vz += 0.02;
        }

        // Gravity dropout (horizontal)
        p.vy -= 0.003;

        // Apply motion
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Filter wall interactions
        if (Math.abs(p.x) > 0.07 || Math.abs(p.y) > 0.07) {
            this.cakeThickness += 0.00001;
            return false; // remove particle
        }

        return true;
    }

    step() {
        this.time += 1;

        // Spawn rate scaled from BPD flow
        if (this.time % 2 === 0) this.spawnParticle();

        this.particles = this.particles.filter(p => this.updateParticle(p));

        // Pressure drop model: ΔP rises as cake forms
        this.pressureDrop = 5 + this.cakeThickness * 1200;

        return {
            pressure: this.pressureDrop,
            cake: this.cakeThickness
        };
    }
}

window.PhysicsEngine = PhysicsEngine;

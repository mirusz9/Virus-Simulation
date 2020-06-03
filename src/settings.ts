export default {
	fps: 30,               // The refresh rate of the simulation (The simulation is optimized for 30 frames per second)
	popSize: 500,          // How many cells are there in the simulation
	socialDistancing: 0, // How many cells are social distancing out of the population size
	maxVel: 1,             // The max velocity that a cell can reach in pixels
	infectious: {          // Settings of the infected cells
		range: 30,           // The range they can infect others in pixels
		count: 1,            // How many infected cells are there at the start of the simulation
		probab: 0.5,        // The probability a cell infects another cell if it is in range. By default 0.05 (5% chance)
		duration: 2,         // The duration a cell is infected in seconds. By default 5 seconds (At 30 fps 5*30=150 frames)
	},
};

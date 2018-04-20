const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || 'development';
const config = require(`${__dirname}/../../config/config.json`)[env];

let sequelize;
if (config.use_env_variable) {
	sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
	sequelize = new Sequelize(
		config.database, config.username, config.password, config
	);
}

// Processes all models in current directory
const models = Object.assign({}, ...fs.readdirSync(__dirname)
	.filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js') && (file.slice(-3) === '.js'))
	.map((file) => {
		const model = require(path.join(__dirname, file));
		return { [model.name]: model.init(sequelize) }; })
);

// Load model associations
for (const model of Object.keys(models)) {
	typeof models[model].associate === 'function' && models[model].associate(models);
}

models.sequelize = sequelize;
export default models;

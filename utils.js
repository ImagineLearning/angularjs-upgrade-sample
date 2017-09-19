const _glob = require('glob');

module.exports = {
	glob: glob
};

function glob(patterns) {
	return patterns.reduce(
		(aggregator, pattern) => {
			let map = Object.assign({}, aggregator.map); // copy object
			let fileArray = aggregator.files.slice(); // copy array
			_glob.sync(pattern).forEach(file => {
				if (!map[file]) {
					map[file] = file;
					fileArray.push(file);
				}
			});
			return {
				files: fileArray,
				map: map
			};
		},
		{ files: [], map: {} }
	).files;
}

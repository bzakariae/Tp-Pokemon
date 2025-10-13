var exec = require('cordova/exec');

exports.vibratePattern = function (pattern) {
    exec(null, null, 'AdvancedVibration', 'vibratePattern', [pattern]);
};

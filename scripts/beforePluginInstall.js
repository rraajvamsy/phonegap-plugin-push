var fs = require('fs');
module.exports = function (context) {
  var projectLocation = __dirname + '/../../../';
	// destination.txt will be created or overwritten by default.
	fs.copyFile(projectLocation + 'www/google-services.json', projectLocation + 'platforms/android/app/google-services.json', (err) => {
	  if (err) {
		  console.warn('google-services.json is not copied');
		  console.error(err);
	  }
	  console.log('google-services.json is copied');
	});
};
